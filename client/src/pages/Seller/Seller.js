import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
// import { QUERY_GAME } from "../../../../graphql/queries";
import Auth from '../../auth/auth';

export default function Seller() {
  // const { loading, error, data } = useQuery(QUERY_GAME);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error</p>;

  return (
    <div>
      <p>This is the Seller page!</p>
      <p>Uername: {Auth.getProfile().data.username}</p>
    </div>
  );
}
