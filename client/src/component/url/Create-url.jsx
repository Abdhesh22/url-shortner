import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import apiService from "../../utils/request/apiService";
import { toast } from "react-toastify";
import { SERVER_TOAST } from "../../utils/constants/server.constants";

const CreateUrl = () => {
  const [longUrl, setLongUrl] = useState("");
  const baseURL = import.meta.env.VITE_DOMAIN_URL;
  const [shortUrl, setShortUrl] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const generateUrl = async () => {
    try {
      if (!longUrl) {
        setError("URL cannot be empty");
        return;
      }

      if (!isValidUrl(longUrl)) {
        setError("Invalid URL format");
        return;
      }

      setIsSubmitting(true);
      setError("");

      const reponse = await apiService.post("/api/url", {
        longUrl: longUrl,
      });

      const { data } = reponse;
      setIsSubmitting(false);
      toast.success(data.message);
      setShortUrl(`${baseURL}${data.shortUrl}`);
    } catch (error) {
      toast.error(SERVER_TOAST.INTERNAL_ERROR);
      setIsSubmitting(false);
    }
  };
  const handleCopy = () => {
    if (navigator.clipboard && window.isSecureContext) {
      // Use the modern Clipboard API
      navigator.clipboard
        .writeText(shortUrl)
        .then(() => toast.success("Url has been copied!"))
        .catch((err) => toast.error("Error occured while copy url"));
    } else {
      // Fallback for insecure contexts or unsupported browsers
      const textArea = document.createElement("textarea");
      textArea.value = shortUrl;

      // Avoid showing the textarea to the user
      textArea.style.position = "fixed";
      textArea.style.top = "-1000px";
      textArea.style.left = "-1000px";

      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        const successful = document.execCommand("copy");
        successful
          ? toast.success("Url has been copied!")
          : toast.error("Error occured while copy url");
      } catch (err) {
        toast.error("Error occured while copy url");
      }

      document.body.removeChild(textArea);
    }
  };

  return (
    <div className="container">
      <div className="d-flex row justify-content-center w-100">
        {/* Long URL Input */}
        <div className="col-lg-8 mt-2">
          <div className="card shadow-sm p-4">
            <div className="mb-3">
              <label htmlFor="longUrl" className="form-label">
                <h5>Long URL</h5>
              </label>
              <input
                type="text"
                className="form-control"
                id="longUrl"
                name="longUrl"
                placeholder="Insert Long URL"
                required
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
              />
              {error && <div className="invalid-feedback">{error}</div>}
            </div>
            {!isSubmitting && (
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => generateUrl()}
              >
                Generate URL
              </button>
            )}
            {isSubmitting && (
              <button className="btn btn-primary" type="button" disabled="">
                <span
                  className="spinner-border spinner-border-sm"
                  aria-hidden="true"
                ></span>
                <span role="status">Loading...</span>
              </button>
            )}
          </div>
        </div>

        {/* Short URL Display */}
        {shortUrl && (
          <div className="col-lg-8 mt-2">
            <div className="card shadow-sm p-4">
              <h5>Short URL</h5>
              <div className="d-flex align-items-center justify-content-between">
                <p className="mb-0 text-primary">{shortUrl}</p>
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => handleCopy()}
                >
                  Copy
                  <FontAwesomeIcon icon={faClipboard} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateUrl;
