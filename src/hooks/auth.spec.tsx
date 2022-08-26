import fetchMock from "jest-fetch-mock";
import { act, renderHook } from "@testing-library/react-hooks";
import { startAsync } from "expo-auth-session";
import { AuthProvider, useAuth } from "./auth";

jest.mock("expo-apple-authentication", () => {});

jest.mock("expo-auth-session");

fetchMock.enableMocks();

const userTest = {
  id: "any_id",
  email: "john.doe@email.com",
  name: "John Doe",
  photo: "any_photo.png",
};

describe("Auth Hook", () => {
  it("should be able to sign in with Google account existing", async () => {
    const googleMocked = jest.mocked(startAsync as any);

    googleMocked.mockResolvedValueOnce({
      type: "success",
      params: {
        accessToken: "any_token",
      },
    });

    fetchMock.mockResponseOnce(JSON.stringify(userTest));

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(async () => result.current.signInWithGoogle());

    expect(result.current.user).toBeTruthy();
  });

  it("user should not connect if cancel authentication with Google", async () => {
    const googleMocked = jest.mocked(startAsync as any);

    googleMocked.mockResolvedValueOnce({
      type: "cancel",
    });

    fetchMock.mockResponseOnce(JSON.stringify(userTest));

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(async () => result.current.signInWithGoogle());

    expect(result.current.user).not.toHaveProperty("any_id");
  });
});
