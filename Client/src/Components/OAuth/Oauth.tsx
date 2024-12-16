import { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../Utils/Context/AuthContext";
import { FaFacebook } from "react-icons/fa";
import { FacebookProvider, LoginButton } from "react-facebook";

declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
          }) => void;
          renderButton: (
            container: HTMLElement,
            options: {
              theme: string;
              size: string;
            }
          ) => void;
        };
      };
    };
  }
}

const OAuthComponent = () => {
  const { LoginWithGoogle } = useAuth();

  useEffect(() => {
    const loadGoogleSDK = () => {
      if (!window.google) {
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        script.onload = initializeGoogleOAuth;
        script.onerror = () => {
          console.error("Failed to load Google Identity Services SDK.");
        };
        document.head.appendChild(script);
      } else {
        initializeGoogleOAuth();
      }
    };

    const initializeGoogleOAuth = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID as string,
          callback: handleGoogleResponse,
        });

        const container = document.getElementById("google-login-btn");
        if (container) {
          window.google.accounts.id.renderButton(container, {
            theme: "outline",
            size: "large",
          });
        }
      } else {
        console.error("Google SDK not loaded yet.");
      }
    };

    const handleGoogleResponse = (response: { credential: string }) => {
      try {
        const decoded: {
          email: string;
          given_name: string;
          family_name: string;
        } = jwtDecode(response.credential);

        LoginWithGoogle({
          Email: decoded.email,
          Given_name: decoded.given_name,
        });
      } catch (error) {
        console.error("Failed to decode JWT:", error);
      }
    };

    loadGoogleSDK();
  }, []);

  const handleGoogleClick = () => {
    (
      document.getElementsByClassName(
        "nsm7Bb-HzV7m-LgbsSe-MJoBVe"
      )[0] as HTMLElement
    ).click();
  };

  const handleFacebookSuccess = (response: unknown) => {
    console.log(response);
  };

  const handleFacebookError = (error: Error) => {
    console.error(error);
  };

  const handleFacebookClick = () => {
    document.getElementById("facebook-login-btn")?.click();
  };

  return (
    <div className="flex md:flex-row justify-around w-full my-12 text-center text-2xl font-medium tracking-tight flex-col gap-6 ">
      <div
        onClick={handleGoogleClick}
        className="flex-grow border-2 py-3 rounded-lg flex flex-row text-center items-center justify-center gap-3 hover:cursor-pointer hover:border-gray-500 transition-all duration-200"
      >
        <FcGoogle />
        <p>Google</p>
      </div>
      <FacebookProvider appId={import.meta.env.VITE_FACEBOOK_APP_ID as string}>
        <div
          onClick={() => {
            handleFacebookClick();
          }}
          className="flex-grow border-2 py-3 rounded-lg flex flex-row text-center items-center justify-center gap-3 hover:cursor-pointer hover:border-gray-500 transition-all duration-200"
        >
          <FaFacebook color="blue" />
          <p>Facebook</p>
        </div>
        <div className="hidden">
          <LoginButton
            scope="email"
            onError={handleFacebookError}
            onSuccess={handleFacebookSuccess}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            id="facebook-login-btn"
          >
            Login via Facebook
          </LoginButton>
        </div>
      </FacebookProvider>

      <div id="google-login-btn" className="hidden"></div>
    </div>
  );
};

export default OAuthComponent;
