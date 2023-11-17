import React from "react";
import { Link } from "react-router-dom";
import "./message.scss";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../utils/makeRequest";
import { useParams } from "react-router-dom";

const Message = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const params = useParams().id;

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["messages"],
    queryFn: () =>
      makeRequest.get(`/messages/${params}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (message) => {
      return makeRequest.post("/messages", message);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });

  const handleMessage = (e) => {
    e.preventDefault();
    mutation.mutate({
      conversationId: params,
      desc: e.target[0].value,
    });
    e.target[0].value = "";
  };
  return (
    <div className="message">
      <div className="container">
        <span className="breadcrumbs">
          <Link to="/messages">Messages</Link> &gt; John Doe &gt;
        </span>
        {isLoading ? (
          "isLoading"
        ) : error ? (
          "error"
        ) : (
          <div className="messages">
            {data.map((m) => (
              <div className={m.userId === currentUser._id ? "owner item" : "item"} key={m._id}>
                <img
                  src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
                <p>{m.desc}</p>
              </div>
            ))}
          </div>
        )}
        <hr />
        <form className="write" onSubmit={handleMessage}>
          <textarea type="text" placeholder="write a message" />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Message;
