import React, { useState, useEffect, useRef } from "react";
import AdminNav from "../../layout/AdminNav";
import { createPerson, getPerson, removePerson } from "../../functions/person";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Table, Avatar, Image } from "antd";
import { Link } from "react-router-dom";
import { Progress } from "antd";
import moment from "moment/min/moment-with-locales";

const AdminCreatePerson = () => {
  const fileInputRef = useRef(null);

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const [person, setPerson] = useState([]);
  const [file, setFile] = useState("");

  const [uploadPercent, setUploadPercent] = useState(0);

  useEffect(() => {
    loadingPerson(user.token);
  }, []);

  const loadingPerson = (authentoken) => {
    getPerson(authentoken)
      .then((res) => {
        setPerson(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("error");
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("data", name);
    createPerson(formData, user.token, setUploadPercent)
      .then((res) => {
        setName("");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        setUploadPercent(0);
        loadingPerson(user.token);
        setLoading(false);
        toast.success("create " + res.data.name + " complete");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response);
      });
  };

  const handleRemove = (id) => {
    if (window.confirm("Are you sure?")) {
      setLoading(true);
      removePerson(id, user.token)
        .then((res) => {
          loadingPerson(user.token);
          setLoading(false);
          toast.success("remove " + res.data.name + " complete");
        })
        .catch((err) => {
          setLoading(false);
          toast.error(err.response);
        });
    }
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "File",
      render: (record) => (
        <>
          <Avatar
            shape="circle"
            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
            src={
              <Image
                src={`http://localhost:8000/uploads/${record.pic}`}
                height={"100%"}
              />
            }
          />
        </>
      ),
    },
    {
      title: "Date",
      render: (record) => (
        <>
        {/* format lao */}
          {moment(record.date).locale("lo").format("llll")}
        </>
      ),
    },
    {
      title: "Action",
      render: (record) => (
        <>
          <span
            className="btn btn-sm float-end"
            onClick={() => handleRemove(record._id)}
          >
            <DeleteOutlined className="text-danger" />
          </span>
          <Link to={`/admin/update-person/${record._id}`}>
            <span className="btn btn-sm float-end">
              <EditOutlined className="text-warning" />
            </span>
          </Link>
        </>
      ),
    },
  ];

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div>
          {loading ? <h4>loading...</h4> : <h4>Admin CreatePerson</h4>}
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label>name</label>
              <input
                value={name}
                type="text"
                className="form-control"
                autoFocus
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label>Choose File</label>
              <input
                ref={fileInputRef}
                type="file"
                className="form-control"
                id="customFile"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
            </div>
            <Progress
              percent={uploadPercent}
              status="active"
              strokeColor={{
                from: "#108ee9",
                to: "#87d068",
              }}
            />
            <button className="btn btn-outline-primary">Save</button>
          </form>
          <hr />
          <Table columns={columns} dataSource={person} rowKey="_id" />
        </div>
      </div>
    </div>
  );
};

export default AdminCreatePerson;
