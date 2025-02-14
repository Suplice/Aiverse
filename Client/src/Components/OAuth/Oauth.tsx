import { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../Utils/Context/AuthContext";
import { FaFacebook } from "react-icons/fa";
import { FacebookProvider, LoginButton } from "react-facebook";
import TextField from "../UI/TextField";
import BlockTextField from "../UI/BlockTextField";
import Block from "../UI/Block";

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
    /**
     * Loads the Google Identity Services SDK and initializes it.
     * If the SDK is already loaded, it initializes it directly.
     * If the SDK fails to load, it logs an error.
     * @function loadGoogleSDK
     * @returns {void}
     */
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

    /**
     * Initializes the Google Identity Services SDK.
     * If the SDK is already loaded, it initializes it directly.
     * If the SDK fails to load, it logs an error.
     * @function initializeGoogleOAuth
     * @returns {void}
     */
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

    /**
     * Handles the response from Google containing the credential.
     * It decodes the credential and sends it to the server for authentication.
     * If decoding fails, it logs an error.
     *
     * @function handleGoogleResponse
     * @param response The response from Google containing the credential.
     * @returns {void}
     */
    const handleGoogleResponse = (response: { credential: string }) => {
      try {
        const decoded: {
          email: string;
          given_name: string;
          family_name: string;
        } = jwtDecode(response.credential);

        LoginWithGoogle({
          Email: decoded.email,
          GivenName: decoded.given_name,
        });
      } catch (error) {
        console.error("Failed to decode JWT:", error);
      }
    };

    loadGoogleSDK();
  }, []);

  /**
   * Handles the click on the Google button.
   * It clicks the hidden Google button to trigger the Google OAuth flow.
   *
   * @function handleGoogleClick
   * @returns {void}
   */
  const handleGoogleClick = () => {
    (
      document.getElementsByClassName(
        "nsm7Bb-HzV7m-LgbsSe-MJoBVe"
      )[0] as HTMLElement
    ).click();
  };

  /**
   * Handles the success response from Facebook.
   * Currently not implemented.
   * @function handleFacebookSuccess
   * @param response The response from Facebook.
   * @returns {void}
   */
  const handleFacebookSuccess = (response: unknown) => {
    console.log(response);
  };

  /**
   * Handles the error response from Facebook.
   * It logs the error to the console.
   * Currently not implemented.
   * @function handleFacebookError
   * @param error The error from Facebook.
   * @returns {void}
   */
  const handleFacebookError = (error: Error) => {
    console.error(error);
  };

  /**
   * Handles the click on the Facebook button.
   * It clicks the hidden Facebook button to trigger the Facebook OAuth flow.
   * Currently not working.
   *
   * @function handleFacebookClick
   * @returns {void}
   */
  const handleFacebookClick = () => {
    document.getElementById("facebook-login-btn")?.click();
  };

  return (
    <Block
      className="md:flex-row w-full my-12 text-center text-2xl font-medium tracking-tight "
      justify="around"
      gap={6}
      direction="column"
    >
      <BlockTextField
        color="white"
        onClick={handleGoogleClick}
        className="flex-grow border-2 py-3 rounded-lg flex flex-row text-center items-center justify-center gap-3 hover:cursor-pointer hover:border-gray-500 transition-all duration-200"
      >
        <FcGoogle />
        <TextField value="Google" color="black" />
      </BlockTextField>

      <FacebookProvider appId={import.meta.env.VITE_FACEBOOK_APP_ID as string}>
        <BlockTextField
          onClick={() => {
            handleFacebookClick();
          }}
          className="flex-grow border-2 py-3 rounded-lg flex flex-row text-center items-center justify-center gap-3 hover:cursor-pointer hover:border-gray-500 transition-all duration-200"
        >
          <FaFacebook color="blue" />
          <TextField value="Facebook" color="black" />
        </BlockTextField>

        <div className="hidden">
          <LoginButton
            scope="email"
            onError={handleFacebookError}
            onSuccess={handleFacebookSuccess}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            id="facebook-login-btn"
          >
            <TextField value="Login via Facebook" color="black" />
          </LoginButton>
        </div>
      </FacebookProvider>

      <div id="google-login-btn" className="hidden"></div>
    </Block>
  );
};

export default OAuthComponent;
