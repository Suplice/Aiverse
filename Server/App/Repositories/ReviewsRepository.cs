using Server.App.Models;
using Supabase;

/// <summary>
/// The <see cref="ReviewsRepository"/> class is responsible for handling review-related database operations.
/// It interacts with the Supabase database and the application database context (<see cref="AppDbContext"/>) to perform operations
/// such as adding reviews, retrieving reviews for a service, and fetching services reviewed by a user.
/// </summary>
/// <remarks>
/// This class manages reviews for AI services, including updating service ratings and review counts. It uses transactions to ensure
/// data consistency when adding reviews. Exceptions are handled internally, and methods return null or empty collections in case of errors.
/// </remarks>
public class ReviewsRepository : IReviewsRepository
{
    private readonly Client _supabaseClient;
    private readonly AppDbContext _context;

    /// <summary>
    /// Initializes a new instance of the <see cref="ReviewsRepository"/> class.
    /// </summary>
    /// <param name="supabaseClient">The Supabase client instance used for database operations.</param>
    /// <param name="context">The application database context (<see cref="AppDbContext"/>).</param>
    /// <remarks>
    /// The constructor initializes the Supabase client and the application database context, which are used for database interactions.
    /// </remarks>
    public ReviewsRepository(Client supabaseClient, AppDbContext context)
    {
        _supabaseClient = supabaseClient;
        _context = context;
    }

    /// <inheritdoc/>
    public async Task<Review?> AddReview(Review review)
    {
        await using var transaction = await _context.Database.BeginTransactionAsync();

        try
        {

            var response = await _supabaseClient
                                    .From<Review>()
                                    .Insert(review);

            if (response == null || response.Model == null)
            {
                throw new Exception("Failed to insert review into Supabase.");
            }

            var service = _context.AiServices.SingleOrDefault(s => s.Id == review.AiServiceId);

            if (service == null)
            {
                throw new Exception("Service not found.");
            }


            service.Stars = ((service.Stars * service.Reviews) + review.Stars) / (service.Reviews + 1.0);
            service.Reviews++;

            _context.AiServices.Update(service);
            await _context.SaveChangesAsync();

            await transaction.CommitAsync();

            var model = _context.Reviews.SingleOrDefault(r => r.Id == response.Model.Id);

            return model;
        }
        catch (Exception e)
        {
            await transaction.RollbackAsync();
            Console.WriteLine($"{e.Message}");
            return null;
        }
    }

    /// <inheritdoc/>
    public List<Review>? GetReviews(long serviceId)
    {
        try
        {

            var test = _context.Reviews.Where(r => r.AiServiceId == serviceId).ToList();

            return test;
        }
        catch (Exception e)
        {
            Console.WriteLine($"{e.Message}");
            return null;
        }
    }

    /// <inheritdoc/>
    public async Task<List<AiService>?> GetUserReviewedServicesById(long id)
    {
        try
        {
            var reviewedServices = await _supabaseClient
                                        .From<Review>()
                                        .Where(rs => rs.UserId == id)
                                        .Get();

            if (reviewedServices.Models == null || !reviewedServices.Models.Any())
            {
                return null;
            }

            var serviceIds = reviewedServices.Models.Select(rs => rs.AiServiceId).ToList();

            var aiServices = new List<AiService>();

            foreach (var serviceId in serviceIds)
            {
                var response = await _supabaseClient
                        .From<AiService>()
                        .Where(s => s.Id == serviceId)
                        .Get();

                var service = response.Models.FirstOrDefault();

                if (service != null)
                {
                    aiServices.Add(service);
                }
            }

            return aiServices;
        }
        catch (Exception e)
        {
            Console.WriteLine($"Error: {e.Message}");
            return null;
        }
    }
}