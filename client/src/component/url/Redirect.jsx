import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import apiService from "../../utils/request/apiService";

const RedirectUrl = () => {
  const [redirectUrl, setRedirectUrl] = useState("");
  const { shortUrl } = useParams();
  const navigate = useNavigate();

  const getUrl = async () => {
    const reponse = await apiService.get("/api/url", {
      shortUrl: shortUrl,
    });
    setRedirectUrl(reponse.data.longUrl);
  };

  useEffect(() => {
    getUrl();
  }, []);

  const handleRedirect = async () => {
    if (redirectUrl) {
      window.open(redirectUrl, "_blank");
    } else {
      navigate("/not-found");
    }
  };

  return (
    <div className="container">
      <div className="d-flex row justify-content-center w-100">
        <div className="col-lg-8 mt-2">
          <div className="card shadow-sm p-4">
            <h5>Redirect URL</h5>
            <div className="d-flex align-items-center justify-content-between">
              <p className="mb-0 text-primary">{redirectUrl}</p>
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => handleRedirect()}
              >
                Redirect
                <FontAwesomeIcon icon={faArrowAltCircleRight} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RedirectUrl;
