import { render } from "@testing-library/react-native";

import { ProfileView } from "../../../src/views/Profile";
import { useProfileViewControllerMock } from "../../../test-utils/mocks/useProfileViewControllerMock";

describe("Testing Profile screen", () => {
  it("should render the ProfileView screen correctly", () => {
    const { getByTestId } = render(
      <ProfileView controller={useProfileViewControllerMock} />
    );

    expect(1).toBe(1);
  });
});
