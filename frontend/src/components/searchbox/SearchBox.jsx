"use client";
import React, { useRef, useState, forwardRef, useImperativeHandle } from "react";
import { Magnifying } from "../icons/Icons";

const SearchBox = forwardRef(({ onSearch }, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [inputVisible, setInputVisible] = useState(true);

  const inputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    clearInput() {
      setInputValue("");
    },
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputRef.current) {
      inputRef.current.blur();
    }
    onSearch(inputValue);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const toggleInput = () => {
    setInputVisible((prev) => !prev);
    setInputValue("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex justify-center items-center rounded-lg p-1 focus:outline-none h-full transition-all duration-150 select-none ${
        isFocused ? "ring-1 focus:ring-blue-100" : ""
      } border border-gray-500 ${inputVisible ? "w-full" : "w-[45px]"}`}
    >
      <div
        className="flex justify-center items-center p-1 hover:cursor-pointer"
        onClick={toggleInput}
      >
        <Magnifying width="1.2em" height="1.2em" />
      </div>
      {inputVisible && (
        <input
          ref={inputRef}
          id="searchBoxInput"
          autoComplete="off"
          type="text"
          placeholder="Search"
          value={inputValue}
          onChange={handleInputChange}
          className={`w-full focus:outline-none bg-transparent text-responsive-xs`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        ></input>
      )}

      <button type="submit" className="hidden"></button>
    </form>
  );
});

SearchBox.displayName = "SearchInput";

export default SearchBox;
