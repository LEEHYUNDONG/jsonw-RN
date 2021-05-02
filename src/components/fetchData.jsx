import { useState, useEffect, useMyCustomFetchApiHook } from "react";
import { Button } from "react-native";
import styled from "styled-components/native";

const StyledText = styled.Text`
  font-size: 24px;
  margin: 10px;
`;

const ErrorMessage = styled.Text`
  font-size: 18px;
  color: #e74c3c;
`;

//const URL = "http://127.0.0.1:8000/api/1";

export const useFetch = URL => {
  const [title]
  const [error, setError] = useState(null);
  
  const fetchData = async () => {
    try {
      const res = await fetch(URL);
      const result = await res.json();

      if (res.ok) {
        id = result.id;
        title = result.title;
        setError(null);
      } else {
        throw result;
      }
    } catch (error) {
      setError(error);
    }
  };

  fetchData();
  return { data, error };
};
