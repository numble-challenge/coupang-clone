import axios from "axios";
import cookies from "js-cookie";

class Service {
    getAccessToken(): string | undefined {
        return cookies.get("accessToken");
    }

    getRefreshToken(): string | undefined {
        return cookies.get("refreshToken");
    }

    setTokens(accessToken: string, refreshToken: string): void {
        cookies.set("accessToken", accessToken, { expires: 1 });
        cookies.set("refreshToken", refreshToken, { expires: 7 });
    }
}

export default Service;