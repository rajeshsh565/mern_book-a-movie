import axios from "axios";

export const getAllMovies = async () => {
  const res = await axios.get("/api/v1/movies").catch((err) => {
    console.log(err);
  });
  if (res.status !== 200) {
    return console.log("No data");
  }
  const data = await res.data;
  return data;
};

export const sendUserAuthRequest = async (data, signup) => {
  const res = await axios
    .post(`/api/v1/users/${signup ? "signup" : "login"}`, {
      name: signup ? data.name : "",
      email: data.email,
      password: data.password,
    })
    .catch((err) => {console.log(err);
    return "unauthorized"});
  if (res.status !== 200 && res.status !== 401) {
    console.log("Unexpected Error Occured");
  }

  const resData = await res.data;
  return resData;
};

export const sendAdminAuthRequest = async (data) => {
  const res = await axios
    .post("/api/v1/admin/login", {
      email: data.email,
      password: data.password,
    })
    .catch((err) => console.log(err));
  if (res.status !== 200) {
    return console.log("Unexpected error occurred.");
  }
  const resData = await res.data;
  return resData;
};

export const getUserBooking = async () => {
  const id = localStorage.getItem("userId");
  const res = await axios
    .get(`/api/v1/users/bookings/${id}`)
    .catch((err) => console.log(err));
  if (res.status !== 201) {
    return console.log("Unexpected error");
  }
  const resData = await res.data;
  // console.log(resData);
  return resData;
};

export const getMoviedetails = async (id) => {
  const res = await axios
    .get(`/api/v1/movies/${id}`)
    .catch((err) => {
      console.log(err);
    });
  if (res.status !== 200) {
    return console.log("unexpected error");
  }
  const resData = await res.data;
  return resData;
};
export const newBooking = async (data) => {
  const res = await axios
    .post("/api/v1/booking", {
      movie: data.movie,
      seatNumber: data.seatNumber,
      date: data.date,
      user: localStorage.getItem("userId"),
    })
    .catch((err) => {
      console.log(err.response);
    });
  if (res.status !== 201) {
    return console.log("unexpected error");
  }
  const resdata = await res.data;
  return resdata;
};

export const deleteBooking = async (id) => {
  const res = await axios
    .delete(`/api/v1/booking/${id}`)
    .catch((err) => {
      console.log(err);
    });
    console.log("Booking delete response: ", res);
    if (res.status !== 200) {
      console.log("unexpected error");
    }
    const resData = await res.data;
  return resData;
};
export const getUserDetails = async () => {
  const id = localStorage.getItem("userId");

  const res = await axios
    .get(`/api/v1/users/${id}`)
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unexpected Error");
  }
  const respData = await res.data;
  // console.log(respData);
  return respData;
};
export const addMovie = async (data) => {
  const res = await axios
    .post(
      "/api/v1/movies/add",
      {
        title: data.inputs.title,
        description: data.inputs.description,
        releaseDate: data.inputs.releaseDate,
        posterUrl: data.inputs.posterUrl,
        featured: data.inputs.featured,
        actors: data.actors,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .catch((err) => console.log(err));
    if (res.status !== 201) {
      return console.log("Unexpected Error!");
    }
    const resData = await res.data;
    console.log("resData: ", resData);
  return resData;
};
export const getAdminById = async () => {
  const adminId = localStorage.getItem("adminId");
  const res = await axios
    .get(`/api/v1/admin/${adminId}`)
    .catch((err) => console.log(err));
  if (res.status !== 200) {
    return console.log("Unexpected Error");
  }
  const resData = await res.data;
  return resData;
};
