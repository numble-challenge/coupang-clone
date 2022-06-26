import axios from "axios";
import cookies from "js-cookie";

type SignupAgreements = {
  privacy: boolean;
  ad:
    | {
        email: boolean;
        sms: boolean;
        app: boolean;
      }
    | false;
};

interface SignUpParams {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  agreements: SignupAgreements;
}

interface LoginParams {
  email: string;
  password: string;
}

class AuthService {
  setAccessToken(accessToken: string) {
    cookies.set("accessToken", accessToken, { expires: 1 });
  }

  setRefreshToken(refreshToken: string) {
    cookies.set("refreshToken", refreshToken, { expires: 7 });
  }

  /** refreshToken을 이용해 새로운 토큰을 발급받습니다. */
  async refresh() {
    const refreshToken = cookies.get("refreshToken");
    if (!refreshToken) return;

    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_HOST}/auth/refresh`,
      null,
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );

    this.setAccessToken(data.access);
    this.setRefreshToken(data.refresh);
  }

  /** 새로운 계정을 생성하고 토큰을 발급받습니다. */
  async signup(params: SignUpParams) {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_HOST}/auth/signup`,
      params
    );

    this.setAccessToken(data.access);
    this.setRefreshToken(data.refresh);
  }

  /** 이미 생성된 계정의 토큰을 발급받습니다. */
  async login(params: LoginParams) {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_HOST}/auth/login`,
      params
    );

    this.setAccessToken(data.access);
    this.setRefreshToken(data.refresh);
  }
}

export default new AuthService();
