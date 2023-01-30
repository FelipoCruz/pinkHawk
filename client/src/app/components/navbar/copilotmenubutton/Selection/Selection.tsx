import React from "react";
import { getSelectionTweets } from "../../../../../services/api.tweets";
import { selectionTweets } from "../../../../../store/slices/tweets.slice";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks";

const Selection = async () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(({ user }) => user);
  console.log('active user', user);

  const fetchSelectionTweets = async () => {
    const response = await getSelectionTweets();
    dispatch(selectionTweets(response));
  }

  return (
    <div>
      <h1>selection of tweets</h1>
    </div>
  );
};

export default Selection;