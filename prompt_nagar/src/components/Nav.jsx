"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  // const [isUserLoggedIn, setIsUserLoggedin] = useState(true);
  const { data: session } = useSession();
  // console.log(`session: `, session);
  // destructuring assignment:
  //    to store the value of data property in the session variable

  const [providers, setProviders] = useState(null);

  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };

    setUpProviders();
  }, []);

  return (
    <nav className="w-full flex-between mb-16 pt-3 ">
      <Link href={"/"} className="flex gap-2 flex-center">
        <Image
          src={"/assets/images/logo.svg"}
          width={30}
          height={30}
          alt="prompt nagar logo"
          className="object-contain"
        />
        <p className="logo_text">Prompt Nagar</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {/* optional chaining operator to check the object is null or undefined beforehand w/o throwing any TypeError */}
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href={"/create-prompt"} className="black_btn">
              Create a Post
            </Link>

            <button type="button" onClick={signOut} className="outline_btn">
              SignOut
            </button>

            <Link href={"/profile"}>
              <Image
                // src={"/assets/images/logo.svg"}
                src={session?.user?.image}
                width={37}
                height={37}
                alt="profile image"
                className="rounded-full"
                onClick={() => {}}
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* {alert(providers)} */}

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user?.image}
              width={37}
              height={37}
              alt="profile image"
              className="rounded-full"
              // onClick={() => {setToggleDropdown(!toggleDropdown)}}
              onClick={() => {
                setToggleDropdown((prev) => !prev);
              }}
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href={"/profile"}
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href={"/create-prompt"}
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create a Prompt
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Now we require useState to open-up the menu */}
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
