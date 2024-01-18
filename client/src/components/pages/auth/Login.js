import { useState } from "react";
import { useNavigate } from "react-router-dom";
//import toastify
import { toast } from "react-toastify";
//function
import { loginHandler } from "../../functions/auth";
//redux store
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const [isloading, setIsLoading] = useState(false);

  const { name, password } = formData;

  const roleBasedRedirect = (res) => {
    if (res === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/user/dashboard");
    }
  };

  const onchange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    //
    const newUser = {
      name,
      password,
    };
    loginHandler(newUser)
      .then((res) => {
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            token: res.data.token,
            name: res.data.payload.user.name,
            role: res.data.payload.user.role,
          },
        });
        localStorage.setItem("token", res.data.token);
        console.log("payload:", res.data.payload);
        setIsLoading(false);
        toast.success("Login Complete!", {
          position: "top-right",
          autoClose: 2000,
          closeOnClick: true,
          theme: "light",
        });
        // navigate("/");
        //check role
        roleBasedRedirect(res.data.payload.user.role)
      })
      .catch((err) => {
        toast.error(err?.response?.data?.msg, {
          position: "top-right",
          autoClose: 2000,
        });
        setIsLoading(false);
      });
  };
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {!isloading ? <h1>Login</h1> : <h1>Loading...</h1>}
          <form onSubmit={onSubmit}>
            <input
              type="text"
              name="name"
              autoFocus
              placeholder="username"
              className="form-control"
              onChange={(e) => onchange(e)}
            />
            <input
              type="password"
              name="password"
              autoFocus
              placeholder="password"
              className="form-control"
              onChange={(e) => onchange(e)}
            />

            <button type="submit" className="btn btn-success">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
