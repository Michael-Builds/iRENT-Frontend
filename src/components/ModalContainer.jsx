import React from "react"
import { useMainState } from "./context/StateContext"
import { ForgotPasswordForm } from "./home/ForgotPassword"
import { LoginForm } from "./home/Login"
import { ResetPasswordForm } from "./home/ResetPassword"
import { SignupForm } from "./home/Signup"
import { Modal } from "./modal"
import { VerifyAccount } from "./home/VerifyAccount"
import ViewForm from "./viewing/ViewForm"
import AddProperty from "./property/AddProperty"
import { SearchModalContent } from "./SearchFilter"
import Landlord from "./landlords/Landlord"

export const ModalContainer = () => {
  const { modalType, closeModal, selectedListing } = useMainState()

  if (!modalType) return null

  console.log(modalType);

  const getModalTitle = () => {
    switch (modalType) {
      case "LOGIN":
        return "Login"
      case "SIGNUP":
        return "Sign Up"
      case "SEARCH":
        return "Search Filters"
      case "FORGOT_PASSWORD":
        return "Forgot Password"
      case "RESET_PASSWORD":
        return "Reset Password"
      case "VIEWING":
        return "Rquest for Viewing"
      case "ADD_PROPERTY":
        return "Add New Property"
      case "ADD_LANDLORD":
        return "Add a New Landlord"
      default:
        return ""
    }
  }

  return (
    <Modal isOpen={!!modalType} closeModal={closeModal} title={getModalTitle()}>
      {modalType === "LOGIN" && <LoginForm />}
      {modalType === "SIGNUP" && <SignupForm />}
      {modalType === "SEARCH" && <SearchModalContent />}
      {modalType === "FORGOT_PASSWORD" && <ForgotPasswordForm />}
      {modalType === "RESET_PASSWORD" && <ResetPasswordForm />}
      {modalType === "VERIFY_ACCOUNT" && <VerifyAccount />}
      {modalType === "VIEWING" && <ViewForm propertyId={selectedListing} />}
      {modalType === "ADD_PROPERTY" && <AddProperty />}
      {modalType === "ADD_LANDLORD" && <Landlord />}
    </Modal>
  )
}
