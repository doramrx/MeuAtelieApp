import { ProfileViewControllerData } from "../../src/view-controllers/useProfileViewController";

export const useProfileViewControllerMock = (): ProfileViewControllerData => {
  return {
    userId: 2,
    dressmakerName: "dressmaker test",
    isModalOpen: false,
    onUpdateDressmakerName: jest.fn(),
    onOpenDetailModal: jest.fn(),
    onOpenEditModal: jest.fn(),
    onOpenEditPasswordModal: jest.fn(),
    onLogOut: jest.fn(),
    onDeleteAccount: jest.fn(),
  };
};