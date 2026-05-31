// src/redux/actions/assignment.js
import axios from "axios";
import { Backend_url } from "../../server";

export const getAllGradAssignment = (id) => async (dispatch) => {
  try {
    dispatch({ type: "GetGradRequest" });

    const { data } = await axios.get(
      `${Backend_url}/assignment/allgraduser/${id}`,
      { withCredentials: true }
    );

    dispatch({
      type: "GetGradSuccess",
      payload: data.alldata, // array
    });
  } catch (error) {
    dispatch({
      type: "GetGradFail",
      payload: error.response?.data?.message || "Something went wrong",
    });
  }
};
