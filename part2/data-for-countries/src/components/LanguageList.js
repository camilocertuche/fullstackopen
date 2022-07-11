import React from "react";

const LanguageList = ({ languages }) => {
  return (
    <>
      <strong>Languages:</strong>
      <ul>
        {Object.keys(languages).map((languageKey) => (
          <li key={languageKey}>{languages[languageKey]}</li>
        ))}
      </ul>
    </>
  );
};

export default LanguageList;
