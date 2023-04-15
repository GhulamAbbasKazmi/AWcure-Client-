import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  removeUser,
  updateUserDetails,
  updateUserDocs,
  removeUserDocs,
  verifyEmailLink,
  verifyEmail,
} from "../../features/user/userActions";

import DocViewer, { DocViewerRenderers } from "react-doc-viewer";

import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBInput,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBSpinner,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBInputGroup,
  MDBIcon,
  MDBCardTitle,
} from "mdb-react-ui-kit";

import "./Profile.css";

function Profile({ darkMode }) {
  const { userId, token } = useParams();

  const [basicModal, setBasicModal] = useState(false);
  const [basicModalUpdate, setBasicModalUpdate] = useState(false);

  const [viewDocs, setViewDocs] = useState([]);

  const {
    loading,
    userInfo,
    update_error,
    delete_error,
    update_success,
    delete_success,
    verify_link_error,
    verify_link_success,
    verify_error,
    verify_success,
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [verticalActive, setVerticalActive] = useState("tab1");

  const [accountVerified, setAccountVerified] = useState(false);

  const [editName, setEditName] = useState({
    check: false,
    value: "",
  });
  const [editPassword, setEditPassword] = useState({
    check: false,
    show: false,
    value: "password",
  });
  const [editMobile, setEditMobile] = useState({
    check: false,
    value: "",
  });
  const [editAddress, setEditAddress] = useState({
    check: false,
    value: "",
  });
  const [imageUrl, setImageUrl] = useState(null);

  const [docsUrls, setDocsUrls] = useState([]);

  const [updateMessage, setUpdateMessage] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");

  const [userDocuments, setUserDocuments] = useState([]);
  const [userDocumentsSelected, setUserDocumentsSelected] = useState([]);

  useEffect(() => {
    if (userId && token) {
      setVerticalActive("tab2");
      dispatch(verifyEmail({ userId, token }));
    }
  }, [userId]);

  useEffect(() => {
    setEditName({ ...editName, value: userInfo?.username });
    setEditMobile({ ...editMobile, value: userInfo?.mobile });
    setEditAddress({ ...editAddress, value: userInfo?.address });
    setImageUrl(userInfo?.image?.url);
    setUserDocuments(userInfo?.documents);
    setAccountVerified(userInfo.is_verified);

    // setDocsUrls(userInfo?.documents);
  }, [userInfo]);

  useEffect(() => {
    if (update_success) {
      setUpdateMessage("Profile Updated Successfully!");
    }
    if (update_error) {
      setUpdateMessage(update_error);
    }
  }, [update_success, update_error]);

  useEffect(() => {
    if (delete_success) {
      setDeleteMessage("Account Deleted Successfully!");
    }
    if (delete_error) {
      setDeleteMessage(delete_error);
    }
  }, [delete_success, delete_error]);

  const openUpdateModal = () => {
    setBasicModalUpdate(!basicModalUpdate);
    setUpdateMessage("");
  };

  const openDeleteModal = () => {
    setBasicModal(!basicModal);
    setDeleteMessage("");
  };

  const closeModalAfterUpdate = () => {
    setBasicModalUpdate(!basicModalUpdate);
    setEditName({ ...editName, check: false });
    setEditMobile({ ...editMobile, check: false });
    setEditAddress({ ...editAddress, check: false });
  };
  const closeModalAfterDelete = () => {
    setBasicModal(!basicModal);
    if (delete_success) {
      navigate("/");
    }
  };

  const inputElement = useRef();
  const inputElementUpload = useRef();

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageToBase64, setImageToBase64] = useState(null);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [documentsToBase64, setDocumentsToBase64] = useState([]);

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));

      const reader = new FileReader();
      reader.readAsDataURL(selectedImage);
      reader.onloadend = () => {
        setImageToBase64(reader.result);
      };
    }
  }, [selectedImage]);

  useEffect(() => {
    if (selectedDocuments.length != 0) {
      if (selectedDocuments[selectedDocuments?.length - 1]) {
        setDocsUrls([
          ...docsUrls,
          URL.createObjectURL(selectedDocuments[selectedDocuments?.length - 1]),
        ]);

        const reader = new FileReader();
        reader.readAsDataURL(selectedDocuments[selectedDocuments?.length - 1]);
        reader.onloadend = () => {
          setDocumentsToBase64([
            ...documentsToBase64,
            {
              name: selectedDocuments[selectedDocuments?.length - 1].name,
              base64: selectedDocuments[selectedDocuments?.length - 1],
            },
          ]);
        };
      }
    }
  }, [selectedDocuments]);

  const changeImage = () => {
    inputElement.current.click();
  };

  const changeDocument = () => {
    inputElementUpload.current.click();
  };

  const removeDocumentsBeforeUpload = () => {
    setSelectedDocuments([]);
    setDocsUrls([]);
    setDocumentsToBase64([]);
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImageUrl(null);
    setImageToBase64(null);
  };

  const handleVerticalClick = (value) => {
    if (value === verticalActive) {
      return;
    }
    setVerticalActive(value);
  };

  const verifyEmailHandler = () => {
    dispatch(verifyEmailLink());
  };

  console.log("documentsToBase64", documentsToBase64);

  return (
    <div className="Profile-main">
      <div className={`${darkMode ? "ProfileForm-dark" : "ProfileForm"}`}>
        <p
          className={` ${darkMode ? "text-light" : "text-dark"}`}
          style={{
            fontSize: "3rem",
            fontWeight: "bolder",
            fontFamily: "sans-serif",
            textShadow:
              "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
          }}
        >
          Profile
        </p>

        <MDBRow>
          <MDBCol md="3">
            <MDBTabs pills className="flex-column text-center">
              <MDBTabsItem>
                <MDBTabsLink
                  onClick={() => handleVerticalClick("tab1")}
                  active={verticalActive === "tab1"}
                >
                  Profile
                </MDBTabsLink>
              </MDBTabsItem>
              <MDBTabsItem>
                <MDBTabsLink
                  onClick={() => handleVerticalClick("tab2")}
                  active={verticalActive === "tab2"}
                >
                  Documents
                </MDBTabsLink>
              </MDBTabsItem>
            </MDBTabs>
          </MDBCol>

          <MDBCol md="9">
            <MDBTabsContent>
              <MDBTabsPane show={verticalActive === "tab1"}>
                <MDBContainer>
                  <MDBRow>
                    <MDBCol>
                      <MDBCard
                        className={`mb-4 ${
                          darkMode ? " text-white bg-dark" : ""
                        }`}
                      >
                        <MDBCardBody className="text-center">
                          <MDBCardImage
                            src={
                              imageUrl
                                ? imageUrl
                                : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                            }
                            alt="avatar"
                            className="rounded-circle"
                            style={{ width: "150px", height: "150px" }}
                            fluid
                          />

                          <div className="d-flex justify-content-center mt-4 mb-4">
                            <MDBRow>
                              <MDBCol className="mb-2">
                                <input
                                  accept="image/*"
                                  type="file"
                                  id="select-image"
                                  style={{ display: "none" }}
                                  ref={inputElement}
                                  onChange={(e) =>
                                    setSelectedImage(e.target.files[0])
                                  }
                                />
                                <MDBBtn
                                  className="btn-rounded"
                                  style={{
                                    backgroundColor: darkMode
                                      ? "#455B8E"
                                      : "#A060FF",
                                  }}
                                  onClick={changeImage}
                                >
                                  Change
                                </MDBBtn>
                              </MDBCol>
                              <MDBCol>
                                <MDBBtn
                                  color="danger"
                                  className="btn-rounded"
                                  style={{
                                    backgroundColor: darkMode ? "#581845" : "",
                                  }}
                                  onClick={removeImage}
                                >
                                  Remove
                                </MDBBtn>
                              </MDBCol>
                            </MDBRow>
                          </div>
                        </MDBCardBody>
                      </MDBCard>
                      <MDBCard
                        className={`mb-4 ${
                          darkMode ? " text-white bg-dark" : ""
                        }`}
                      >
                        <MDBCardBody>
                          <MDBRow className="align-items-center">
                            <MDBCol sm="3">
                              <MDBCardText>Username</MDBCardText>
                            </MDBCol>
                            <MDBCol sm="7">
                              {!editName.check ? (
                                <MDBCardText className="text-muted">
                                  {userInfo?.username}
                                </MDBCardText>
                              ) : (
                                <MDBInput
                                  className="mt-1"
                                  type="text"
                                  id="form2Example1"
                                  label="User name"
                                  contrast={!darkMode ? false : true}
                                  value={editName.value}
                                  onChange={(e) =>
                                    setEditName({
                                      ...editName,
                                      value: e.target.value,
                                    })
                                  }
                                />
                              )}
                            </MDBCol>
                            <MDBCol sm="2">
                              {editName.check ? (
                                <i
                                  onClick={() =>
                                    setEditName({ ...editName, check: false })
                                  }
                                  class="fas fa-times profile-icon"
                                ></i>
                              ) : (
                                <i
                                  onClick={() =>
                                    setEditName({ ...editName, check: true })
                                  }
                                  class="far fa-edit profile-icon"
                                ></i>
                              )}
                            </MDBCol>
                          </MDBRow>
                          <hr />
                          <MDBRow>
                            <MDBCol sm="3">
                              <MDBCardText>Email</MDBCardText>
                            </MDBCol>
                            <MDBCol sm="9">
                              <MDBCardText className="text-muted">
                                {userInfo?.email}
                              </MDBCardText>
                            </MDBCol>
                          </MDBRow>
                          <hr />
                          <MDBRow className="align-items-center">
                            <MDBCol sm="3">
                              <MDBCardText>Password</MDBCardText>
                            </MDBCol>
                            <MDBCol sm="7">
                              {!editPassword.check ? (
                                <MDBCardText className="text-muted">
                                  {editPassword.show
                                    ? editPassword.value
                                    : "*********"}
                                </MDBCardText>
                              ) : (
                                <MDBInput
                                  className="mt-1"
                                  type="password"
                                  id="form2Example1"
                                  label="Password"
                                  contrast={!darkMode ? false : true}
                                  value={editPassword.value}
                                  onChange={(e) =>
                                    setEditPassword({
                                      ...editPassword,
                                      value: e.target.value,
                                    })
                                  }
                                />
                              )}
                            </MDBCol>

                            <MDBCol
                              sm="2"
                              className="d-flex justify-content-between"
                            >
                              {editPassword.check ? (
                                <i
                                  onClick={() =>
                                    setEditPassword({
                                      ...editPassword,
                                      check: false,
                                    })
                                  }
                                  class="fas fa-times profile-icon"
                                ></i>
                              ) : (
                                <i
                                  onClick={() =>
                                    setEditPassword({
                                      ...editPassword,
                                      check: true,
                                    })
                                  }
                                  class="far fa-edit profile-icon"
                                ></i>
                              )}

                              {editPassword.show ? (
                                <i
                                  onClick={() =>
                                    setEditPassword({
                                      ...editPassword,
                                      show: false,
                                    })
                                  }
                                  class="far fa-eye-slash profile-icon"
                                ></i>
                              ) : (
                                <i
                                  onClick={() =>
                                    setEditPassword({
                                      ...editPassword,
                                      show: true,
                                    })
                                  }
                                  class="far fa-eye profile-icon"
                                ></i>
                              )}
                            </MDBCol>
                          </MDBRow>
                          <hr />
                          <MDBRow className="align-items-center">
                            <MDBCol sm="3">
                              <MDBCardText>Mobile</MDBCardText>
                            </MDBCol>
                            <MDBCol sm="7">
                              {!editMobile.check ? (
                                <MDBCardText className="text-muted">
                                  {userInfo?.mobile}
                                </MDBCardText>
                              ) : (
                                <MDBInput
                                  className="mt-1"
                                  type="text"
                                  id="form2Example1"
                                  label="Mobile"
                                  contrast={!darkMode ? false : true}
                                  value={editMobile.value}
                                  onChange={(e) =>
                                    setEditMobile({
                                      ...editMobile,
                                      value: e.target.value,
                                    })
                                  }
                                />
                              )}
                            </MDBCol>
                            <MDBCol sm="2">
                              {editMobile.check ? (
                                <i
                                  onClick={() =>
                                    setEditMobile({
                                      ...editMobile,
                                      check: false,
                                    })
                                  }
                                  class="fas fa-times profile-icon"
                                ></i>
                              ) : (
                                <i
                                  onClick={() =>
                                    setEditMobile({
                                      ...editMobile,
                                      check: true,
                                    })
                                  }
                                  class="far fa-edit profile-icon"
                                ></i>
                              )}
                            </MDBCol>
                          </MDBRow>
                          <hr />
                          <MDBRow className="align-items-center">
                            <MDBCol sm="3">
                              <MDBCardText>Address</MDBCardText>
                            </MDBCol>
                            <MDBCol sm="7">
                              {!editAddress.check ? (
                                <MDBCardText className="text-muted">
                                  {userInfo?.address}
                                </MDBCardText>
                              ) : (
                                <MDBInput
                                  className="mt-1"
                                  type="text"
                                  id="form2Example1"
                                  label="Address"
                                  contrast={!darkMode ? false : true}
                                  value={editAddress.value}
                                  onChange={(e) =>
                                    setEditAddress({
                                      ...editAddress,
                                      value: e.target.value,
                                    })
                                  }
                                />
                              )}
                            </MDBCol>
                            <MDBCol sm="2">
                              {editAddress.check ? (
                                <i
                                  onClick={() =>
                                    setEditAddress({
                                      ...editAddress,
                                      check: false,
                                    })
                                  }
                                  class="fas fa-times profile-icon"
                                ></i>
                              ) : (
                                <i
                                  onClick={() =>
                                    setEditAddress({
                                      ...editAddress,
                                      check: true,
                                    })
                                  }
                                  class="far fa-edit profile-icon"
                                ></i>
                              )}
                            </MDBCol>
                          </MDBRow>
                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                  </MDBRow>

                  <MDBCard
                    className={`${darkMode ? " text-white bg-dark" : ""}`}
                  >
                    <MDBRow className="d-flex justify-content-around align-items-center m-4">
                      <MDBCol sm="5">
                        <MDBBtn
                          color="success"
                          className="mb-2 btn-rounded w-100"
                          style={{ backgroundColor: darkMode ? "#455B8E" : "" }}
                          onClick={openUpdateModal}
                        >
                          Update Profile
                        </MDBBtn>
                      </MDBCol>

                      <MDBCol sm="5">
                        <MDBBtn
                          color="danger"
                          className="mb-2 btn-rounded w-100"
                          style={{ backgroundColor: darkMode ? "#581845" : "" }}
                          onClick={openDeleteModal}
                        >
                          Remove Account
                        </MDBBtn>
                      </MDBCol>
                    </MDBRow>
                  </MDBCard>

                  <MDBModal
                    show={basicModal}
                    setShow={setBasicModal}
                    tabIndex="-1"
                  >
                    <MDBModalDialog>
                      <MDBModalContent>
                        <MDBModalHeader>
                          <MDBModalTitle>
                            {}
                            Account Deletion{" "}
                            <i class="fas fa-exclamation-triangle text-danger"></i>
                          </MDBModalTitle>
                        </MDBModalHeader>
                        {loading ? (
                          <MDBRow className="d-flex justify-content-center align-items-center my-3">
                            <MDBSpinner color="primary">
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </MDBSpinner>
                          </MDBRow>
                        ) : (
                          <>
                            <MDBModalBody>
                              {deleteMessage != ""
                                ? deleteMessage
                                : "Are you sure to remove your account? "}
                            </MDBModalBody>

                            <MDBModalFooter>
                              <MDBBtn
                                color="secondary"
                                onClick={closeModalAfterDelete}
                              >
                                Close
                              </MDBBtn>

                              {deleteMessage == "" ? (
                                <MDBBtn
                                  color="danger"
                                  onClick={() => dispatch(removeUser())}
                                >
                                  Delete Account
                                </MDBBtn>
                              ) : null}
                            </MDBModalFooter>
                          </>
                        )}
                      </MDBModalContent>
                    </MDBModalDialog>
                  </MDBModal>

                  <MDBModal
                    show={basicModalUpdate}
                    setShow={setBasicModalUpdate}
                    tabIndex="-1"
                  >
                    <MDBModalDialog>
                      <MDBModalContent>
                        <MDBModalHeader>
                          <MDBModalTitle>
                            {}
                            Update Profile{" "}
                            <i class="fas fa-user-edit text-success"></i>
                          </MDBModalTitle>
                        </MDBModalHeader>

                        {loading ? (
                          <MDBRow className="d-flex justify-content-center align-items-center my-3">
                            <MDBSpinner color="primary">
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </MDBSpinner>
                          </MDBRow>
                        ) : (
                          <>
                            <MDBModalBody>
                              {updateMessage != ""
                                ? updateMessage
                                : "Are you sure to update your profile? "}
                            </MDBModalBody>

                            <MDBModalFooter>
                              <MDBBtn
                                color="secondary"
                                onClick={closeModalAfterUpdate}
                              >
                                Close
                              </MDBBtn>

                              {updateMessage == "" ? (
                                <MDBBtn
                                  color="success"
                                  onClick={() =>
                                    dispatch(
                                      updateUserDetails({
                                        email: userInfo.email,
                                        username: editName.value,
                                        mobile: editMobile.value,
                                        address: editAddress.value,
                                        image: imageToBase64,
                                        previous_image_id:
                                          userInfo?.image?.public_id,
                                        imageUrl,
                                      })
                                    )
                                  }
                                >
                                  Update Profile
                                </MDBBtn>
                              ) : null}
                            </MDBModalFooter>
                          </>
                        )}
                      </MDBModalContent>
                    </MDBModalDialog>
                  </MDBModal>
                </MDBContainer>
              </MDBTabsPane>

              <MDBTabsPane show={verticalActive === "tab2"}>
                {userInfo?.is_verified || accountVerified ? (
                  <MDBContainer>
                    <MDBCard
                      className={`p-4 ${darkMode ? " text-white bg-dark" : ""}`}
                    >
                      <MDBRow className="d-flex justify-content-between">
                        <MDBCol lg={7} className="mb-2">
                          <MDBInputGroup>
                            <div className="d-flex justify-content-center align-items-center">
                              <MDBInput label="Search" />
                              <span className="searchIcon d-flex justify-content-center align-items-center">
                                <MDBIcon icon="search" />
                              </span>
                            </div>
                          </MDBInputGroup>
                        </MDBCol>
                        <MDBCol lg={5}>
                          <input
                            type="file"
                            multiple="mutiple"
                            id="select-document"
                            style={{ display: "none" }}
                            ref={inputElementUpload}
                            onChange={(e) => {
                              if (
                                !selectedDocuments.includes(e.target.files[0])
                              ) {
                                setSelectedDocuments([
                                  ...selectedDocuments,
                                  e.target.files[0],
                                ]);
                              }
                            }}
                          />
                          <MDBBtn
                            className="btn-rounded d-flex justify-content-between align-items-center"
                            style={{
                              backgroundColor: darkMode ? "#455B8E" : "#A060FF",
                              width: "90%",
                            }}
                            onClick={changeDocument}
                          >
                            <i class="fas fa-upload"></i>
                            Upload Document
                          </MDBBtn>
                        </MDBCol>
                      </MDBRow>
                    </MDBCard>

                    <MDBCard
                      className={`p-4 mt-2 ${
                        darkMode ? " text-white bg-dark" : ""
                      }`}
                    >
                      {selectedDocuments.length != 0 ? (
                        <MDBRow className="d-flex justify-content-center">
                          {selectedDocuments.map((doc) => {
                            const extension = doc?.name.substring(
                              doc?.name.lastIndexOf(".") + 1
                            );

                            return (
                              <MDBCol
                                md={3}
                                className="d-flex justify-content-center align-items-center flex-column mb-4 mx-2 file-box"
                              >
                                <i
                                  class={`fas ${
                                    extension == "pdf"
                                      ? "fa-file-pdf"
                                      : extension == "xlsx" ||
                                        extension == "xls"
                                      ? "fa-file-excel"
                                      : extension == "docx" ||
                                        extension == "doc"
                                      ? "fa-file-word"
                                      : extension == "png" ||
                                        extension == "jpg" ||
                                        extension == "jpeg"
                                      ? "fa-file-image"
                                      : "fa-file-alt"
                                  } fa-3x mx-2`}
                                ></i>
                                <span>{doc?.name}</span>
                              </MDBCol>
                            );
                          })}
                        </MDBRow>
                      ) : userDocuments?.length != 0 ? (
                        <MDBRow className="d-flex justify-content-center">
                          {userDocuments?.map((doc) => {
                            const extension = doc.url.substring(
                              doc.url.lastIndexOf(".") + 1
                            );
                            return (
                              <MDBCol
                                md={3}
                                className={`d-flex justify-content-center align-items-center flex-column mb-4 mx-2 file-box ${
                                  userDocumentsSelected.some(
                                    (document) => document.url == doc.url
                                  )
                                    ? "selectedFileBox"
                                    : null
                                } `}
                                onClick={() => {
                                  if (
                                    userDocumentsSelected.some(
                                      (document) => document.url == doc.url
                                    )
                                  ) {
                                    const newSelected =
                                      userDocumentsSelected.filter(
                                        (selectedDoc) =>
                                          selectedDoc.url != doc.url
                                      );

                                    const newSelectedViewDocs = newSelected.map(
                                      (document_) => {
                                        return { uri: document_.url };
                                      }
                                    );
                                    setViewDocs(newSelectedViewDocs);
                                    setUserDocumentsSelected(newSelected);
                                  } else {
                                    setViewDocs([
                                      ...viewDocs,
                                      { uri: doc.url },
                                    ]);
                                    setUserDocumentsSelected([
                                      ...userDocumentsSelected,
                                      doc,
                                    ]);
                                  }
                                }}
                              >
                                {userDocumentsSelected.some(
                                  (document) => document.url == doc.url
                                ) ? (
                                  <span className="d-flex justify-content-center align-items-center selectedFile">
                                    <i class="fas fa-check text-success"></i>
                                  </span>
                                ) : null}
                                <i
                                  class={`fas ${
                                    extension == "pdf"
                                      ? "fa-file-pdf"
                                      : extension == "xlsx" ||
                                        extension == "xls"
                                      ? "fa-file-excel"
                                      : extension == "docx" ||
                                        extension == "doc"
                                      ? "fa-file-word"
                                      : extension == "png" ||
                                        extension == "jpg" ||
                                        extension == "jpeg"
                                      ? "fa-file-image"
                                      : "fa-file-alt"
                                  } fa-3x mx-2`}
                                ></i>
                                <span>
                                  {doc.public_id.substring(
                                    doc.public_id.lastIndexOf("/") + 1
                                  )}
                                </span>
                              </MDBCol>
                            );
                          })}
                        </MDBRow>
                      ) : (
                        <p
                          className={` ${
                            darkMode ? "text-light" : "text-dark"
                          }`}
                          style={{
                            fontSize: "2rem",
                            fontWeight: "bolder",
                            fontFamily: "sans-serif",
                          }}
                        >
                          No Documents Found!
                        </p>
                      )}
                    </MDBCard>

                    {userDocumentsSelected.length != 0 ||
                    documentsToBase64.length != 0 ? (
                      <MDBCard
                        className={`${
                          darkMode ? "mt-2 text-white bg-dark" : "mt-2"
                        }`}
                      >
                        {loading ? (
                          <MDBRow className="d-flex justify-content-center align-items-center my-3">
                            <MDBSpinner color="primary">
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </MDBSpinner>
                          </MDBRow>
                        ) : (
                          <MDBRow className="d-flex justify-content-around align-items-center m-4">
                            <MDBCol sm="5">
                              <MDBBtn
                                color="success"
                                className="mb-2 btn-rounded w-100"
                                style={{
                                  backgroundColor: darkMode ? "#455B8E" : "",
                                }}
                                onClick={() => {
                                  if (userDocumentsSelected != 0) {
                                    setVerticalActive("tab3");
                                  } else {
                                    dispatch(
                                      updateUserDocs({
                                        email: userInfo.email,
                                        documents: documentsToBase64,
                                      })
                                    );
                                  }
                                }}
                              >
                                {userDocumentsSelected != 0
                                  ? "Preview Doc(s)"
                                  : "Save Doc(s)"}
                              </MDBBtn>
                            </MDBCol>

                            <MDBCol sm="5">
                              <MDBBtn
                                color="danger"
                                className="mb-2 btn-rounded w-100"
                                style={{
                                  backgroundColor: darkMode ? "#581845" : "",
                                }}
                                onClick={() => {
                                  if (documentsToBase64.length != 0) {
                                    removeDocumentsBeforeUpload();
                                  } else {
                                    dispatch(
                                      removeUserDocs({
                                        email: userInfo.email,
                                        documents: userDocumentsSelected,
                                      })
                                    );
                                    setUserDocumentsSelected([]);
                                    setViewDocs([]);
                                  }
                                }}
                              >
                                Remove Document(s)
                              </MDBBtn>
                            </MDBCol>
                          </MDBRow>
                        )}
                      </MDBCard>
                    ) : null}
                  </MDBContainer>
                ) : (
                  <MDBContainer>
                    <MDBCard
                      className={`p-4 ${darkMode ? " text-white bg-dark" : ""}`}
                    >
                      <MDBCardBody className="d-flex justify-content-center align-items-center flex-column">
                        <MDBCardTitle className="d-flex align-items-center">
                          <MDBIcon
                            fas
                            icon="user-circle"
                            size="2x"
                            className="mx-3"
                          />{" "}
                          Verify Your Account
                        </MDBCardTitle>

                        <MDBCardText className="text-center my-3">
                          {`Dear ${userInfo.username}, To upload your Docs, please verify your account first.
                          We'll send you a verification link to your email address to verify your account!`}
                        </MDBCardText>

                        {loading ? (
                          <MDBRow className="d-flex justify-content-center align-items-center my-3">
                            <MDBSpinner color="primary">
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </MDBSpinner>
                          </MDBRow>
                        ) : verify_link_error != null ||
                          verify_error != null ? (
                          <>
                            <div className="text-danger text-center mb-2 mx-2">
                              {verify_link_error || verify_error}{" "}
                              <i class="fas fa-exclamation-triangle text-danger"></i>
                            </div>
                            <span
                              style={{
                                cursor: "pointer",
                                textDecoration: "underline",
                              }}
                              onClick={verifyEmailHandler}
                            >
                              resend
                            </span>
                          </>
                        ) : verify_success ? (
                          <>
                            {verify_success.success}
                            <MDBIcon
                              fas
                              icon="check-double"
                              size="2x"
                              className="mx-2"
                              color="success"
                            />
                            <MDBBtn
                              className="btn-rounded my-2"
                              style={{
                                backgroundColor: darkMode
                                  ? "#455B8E"
                                  : "#A060FF",
                              }}
                              onClick={() => {
                                setAccountVerified(true);
                                navigate("/profile");
                              }}
                            >
                              Proceed
                            </MDBBtn>
                          </>
                        ) : verify_link_success ? (
                          <>
                            <div className="mt-2 text-center">
                              {verify_link_success.success}
                              <br />
                              <strong>{userInfo?.email}</strong>
                            </div>

                            <div className="mt-3 text-center text-muted">
                              Didn't receive the email?{" "}
                              <span
                                style={{
                                  cursor: "pointer",
                                  textDecoration: "underline",
                                }}
                                onClick={verifyEmailHandler}
                              >
                                resend
                              </span>
                            </div>
                          </>
                        ) : (
                          <MDBBtn
                            className="btn-rounded"
                            style={{
                              backgroundColor: darkMode ? "#455B8E" : "#A060FF",
                            }}
                            onClick={verifyEmailHandler}
                          >
                            Verify Email
                          </MDBBtn>
                        )}
                      </MDBCardBody>
                    </MDBCard>
                  </MDBContainer>
                )}
              </MDBTabsPane>

              <MDBTabsPane show={verticalActive === "tab3"}>
                <MDBContainer>
                  <DocViewer
                    pluginRenderers={DocViewerRenderers}
                    documents={viewDocs}
                    config={{
                      header: {
                        disableHeader: false,
                        disableFileName: false,
                        retainURLParams: false,
                      },
                    }}
                    style={{ height: 500 }}
                  />
                </MDBContainer>
              </MDBTabsPane>
            </MDBTabsContent>
          </MDBCol>
        </MDBRow>
      </div>
    </div>
  );
}

export default Profile;
