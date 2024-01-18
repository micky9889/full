import axios from "axios";

export const createPerson = async (formData, authentoken, setUploadPercent) => {
  return await axios.post(`${process.env.REACT_APP_API}/person`, formData, {
    headers: { authentoken },
    onUploadProgress: (ProgressEvent) => {
      setUploadPercent(
        parseInt(Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total))
      );
    },
  });
};

export const getPerson = async (authentoken) => {
  return await axios.get(`${process.env.REACT_APP_API}/person`, {
    headers: { authentoken },
  });
};

export const getPersonById = async (id, authentoken) => {
  return await axios.get(`${process.env.REACT_APP_API}/person/${id}`, {
    headers: { authentoken },
  });
};

export const updatePerson = async (name, id, authentoken) => {
  return await axios.put(`${process.env.REACT_APP_API}/person/${id}`, name, {
    headers: { authentoken },
  });
};

export const removePerson = async (id, authentoken) => {
  return await axios.delete(`${process.env.REACT_APP_API}/person/${id}`, {
    headers: { authentoken },
  });
};
