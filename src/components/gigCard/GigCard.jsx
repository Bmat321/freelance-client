import React from "react";
import "./gigCard.scss";
import { Link } from "react-router-dom";
import { makeRequest } from "../../pages/utils/makeRequest";
import { useQuery } from "@tanstack/react-query";

const GigCard = ({ item }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: [`${item.userId}`],
    queryFn: () =>
      makeRequest.get(`/users/${item.userId}`).then((res) => {
        return res.data;
      }),
  });
  const incresedTo1 = item.starNumber + 1;

  return (
    <Link to={`/gig/${item._id}`} className="link">
      <div className="gigCard">
        <img src={item.cover} alt="" />
        <div className="info">
          {isLoading ? (
            "isLoading"
          ) : error ? (
            "something went wrong"
          ) : (
            <div className="user">
              <img src={item.img || "/img/noavatar.jpg"} alt="" />
              <span>{data?.username}</span>
            </div>
          )}
          <p>{item.desc}</p>
          <div className="star">
            <img src="./img/star.png" alt="" />
            <span>
              {!isNaN(item.totalStars / incresedTo1) &&
                Math.round(item.totalStars / incresedTo1)}
            </span>
          </div>
        </div>
        <hr />
        <div className="detail">
          <img src="./img/heart.png" alt="" />
          <div className="price">
            <span>STARTING AT</span>
            <h2>
              $ {item.price}
              <span>99</span>
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
