import React, { Component, useEffect } from "react"
import { useSelector } from "react-redux"
import BookItem from "./BookItem"
import FilmDetail from "./FilmDetail"
import MapDetail from "./MapDetail"
import CheckInfo from "./CheckInfo"
import FinalStep from "./FinalStep"
import EditorJS from "@editorjs/editorjs"
import Header from "@editorjs/header"
import List from "@editorjs/list"
import Embed from "@editorjs/embed"
import ImageTool from "@editorjs/image"

const BookTicketPage = (props) => {
  console.log(props)

  useEffect(() => {
    if (!!props.payUrl) {
      window.open(props.payUrl)
      props.actions.getPaymentUrlSuccess()
    }
    console.log(!!props.payUrl)
  }, [props.payUrl])

  return (
    <React.Fragment>
      <div style={{ width: "100%", marginTop: "10rem" }} className='container'>
        <div className='row'>
          <FinalStep {...props} />
        </div>
      </div>
    </React.Fragment>
  )
}

export default BookTicketPage
