import React, { useRef, useState } from "react";
import "./gigs.scss";
import GigCard from "../../components/gigCard/GigCard";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../utils/makeRequest";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import getCurrentUser from "../utils/getCurrentUser";

function Gigs() {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const minRef = useRef();
  const maxRef = useRef();
  const { search } = useLocation();
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs"],
    queryFn: () =>
      makeRequest
        .get(
          `/gigs${search}&min=${minRef.current.value}&max=${maxRef.current?.value}&sort=${sort}`
        )
        .then((res) => {
          return res.data;
        }),
  });

  const apply = () => {
    refetch();
  };

  useEffect(() => {
    if (currentUser) {
      refetch();
    }
  }, [sort, currentUser]);

  return (
    <div className="gigs">
      {!currentUser ? (
        <div className="currentUser">
          <h2>Please Join or Sign in</h2>
          <div>
            <Link to="/login" className="link">
              Sign in
            </Link>

            <button className="link" onClick={() => navigate("/register")}>
              Join
            </button>
          </div>
        </div>
      ) : (
        <div className="container">
          <span className="breadcrumbs">
            Freelance {">"} Graphics & Design {">"}
          </span>
          <h1>AI Artists</h1>
          <p>
            Explore the boundaries of art and technology with Freelance&apos;s
            AI artists
          </p>
          <div className="menu">
            <div className="left">
              <span>Budget</span>
              <input ref={minRef} type="number" placeholder="min" />
              <input ref={maxRef} type="number" placeholder="max" />
              <button onClick={apply}>Apply</button>
            </div>
            <div className="right">
              <span className="sortBy">Sort by</span>
              <span className="sortType">
                {sort === "sales" ? "Best Selling" : "Newest"}
              </span>
              <img src="./img/down.png" alt="" onClick={() => setOpen(!open)} />
              {open && (
                <div className="rightMenu">
                  {sort === "sales" ? (
                    <span onClick={() => reSort("createdAt")}>Newest</span>
                  ) : (
                    <span onClick={() => reSort("sales")}>Best Selling</span>
                  )}
                  <span onClick={() => reSort("sales")}>Popular</span>
                </div>
              )}
            </div>
          </div>
          <div className="cards">
            {isLoading
              ? "isloading"
              : error
              ? "Something went wrong"
              : data.map((gig) => <GigCard key={gig._id} item={gig} />)}
          </div>
        </div>
      )}
    </div>
  );
}

export default Gigs;
