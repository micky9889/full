import React, { useState, useEffect, useRef } from "react";
import AdminNav from "../../layout/AdminNav";
import { getPersonById, updatePerson } from "../../functions/person";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

const AdminUpdatePerson = () => {
  const fileInputRef = useRef(null);
  const { user } = useSelector((state) => ({ ...state }));
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("");
  const [fileold, setFileold] = useState("");

  useEffect(() => {
    loadingPerson(id, user.token);
  }, []);

  const loadingPerson = (id, authentoken) => {
    getPersonById(id, authentoken)
      .then((res) => {
        // console.log("resload:",res.data);
        setFilename(res.data.pic);
        setFileold(res.data.pic);
        setName(res.data.name);
      })
      .catch((err) => {
        console.log(err);
        toast.error("getpersonbyid error");
      });
  };

  const handleFileInputChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name || "");
  };
//1
  // const handleBrowseClick = () => {
  //   fileInputRef.current.click();
  // };
  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("data", name);
    formData.append("filename", filename);
    formData.append("fileold", fileold);

    updatePerson(formData, id, user.token)
      .then((res) => {
        loadingPerson(id, user.token);
        setLoading(false);
        toast.success("update " + res.data.name + " complete");
        navigate("/admin/create-person");
      })
      .catch((err) => {
        setLoading(false);
        toast.error("update " + err.response);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div>
          {loading ? <h4>loading...</h4> : <h4>Admin Update Person</h4>}
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label>name</label>
              <input
                type="text"
                className="form-control"
                autoFocus
                required
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className="mb-4">
              {/* 1 */}
              {/* <input
                ref={fileInputRef}
                type="file"
                className="form-control"
                onChange={handleFileInputChange}
                style={{ display: "none" }}
              />
              <div className="form-control mt-3 d-flex justify-content-between">
                <label>{filename}</label>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleBrowseClick}
                >
                  Browse
                </button>
              </div> */}
               <input
                ref={fileInputRef}
                type="file"
                className="form-control"
                onChange={handleFileInputChange}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminUpdatePerson;
