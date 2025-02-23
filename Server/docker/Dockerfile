FROM mcr.microsoft.com/dotnet/sdk:8.0 as dev

WORKDIR /app

COPY *.csproj ./

RUN dotnet restore

COPY . .

EXPOSE 5000


CMD ["dotnet", "run", "--urls", "http://0.0.0.0:5000"]

