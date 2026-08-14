"use client";

import React, { useState, useEffect } from "react";

export function ProtectedEmail() {
  const [email, setEmail] = useState("hello [at] rahuldhole [dot] com");
  const [href, setHref] = useState("#");

  useEffect(() => {
    // Decode the email on the client side only to hide from bots
    const user = "hello";
    const domain = "rahuldhole.com";
    const address = `${user}@${domain}`;
    
    setEmail(address);
    setHref(`mailto:${address}`);
  }, []);

  return (
    <a 
      href={href} 
      className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
    >
      {email}
    </a>
  );
}
