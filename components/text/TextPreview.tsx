import React from "react"

const TextPreview = ({ type, description, htmlContent, handlePreview }) => {
  return (
    <>
      <div
        id="preview"
        className="absolute top-0 right-0 bottom-0 left-0 flex min-h-screen w-full items-center justify-center opacity-95 bg-blueGray-800 md:p-12"
        onClick={handlePreview}
      >
        <div
          className="h-4/5 w-4/5 rounded-lg bg-white p-8 shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          {type === "markdown" ? (
            <div dangerouslySetInnerHTML={{ __html : htmlContent }}/>
          ) : (
            <div style={{ whiteSpace : "pre-wrap" }}>
              {description}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default TextPreview
