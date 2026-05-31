import axios from "axios";
import { Backend_url } from "../../server";

// Get all classes for a teacher
export const getAllClasses = (teacherId) => async (dispatch) => {
  try {
    dispatch({ type: "GetClassesRequest" });

    const { data } = await axios.get(`${Backend_url}/class/allclasses/${teacherId}`, {
      withCredentials: true,
    });

    dispatch({
      type: "GetClassesSuccess",
      payload: data.classes, // backend should return { classes: [...] }
    });
  } catch (error) {
    dispatch({
      type: "GetClassesFail",
      payload: error.response?.data?.message || "Something went wrong",
    });
  }
};
