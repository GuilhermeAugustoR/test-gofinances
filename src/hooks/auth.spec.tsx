import { act, renderHook } from "@testing-library/react-native";
import { mocked } from "ts-jest/utils";
import { AuthProvider, useAuth } from "./auth";
import { logInAsync } from "expo-auth-session";

jest.mock("expo-auth-session");

describe("Auth Hook", () => {
  it("should be able to sign in with Google account existing", async () => {
    const googleMocked = mocked(logInAsync as any);
    googleMocked.mockReturnValue({
      type: "success",
      user: {
        id: "any_id",
        email: "guilherme.augusto@gmail.com",
        name: "Rodrigo",
        photo: "any_photo.png",
      },
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user.email).toBe("guilherme.augusto@gmail.com");
  });

  it("user should not connect if cancel authentication with Google", async () => {
    const googleMocked = mocked(logInAsync as any);
    googleMocked.mockReturnValue({
      type: "cancel",
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user).not.toHaveProperty("id");
  });
});
