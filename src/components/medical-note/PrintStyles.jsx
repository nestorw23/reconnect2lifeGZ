
import React from "react"

function PrintStyles() {
  return (
    <style>
      {`
        @media print {
          @page {
            size: letter;
            margin: 2cm;
          }

          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #000;
          }

          .header {
            text-align: center;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 1px solid #000;
          }

          .section {
            margin-bottom: 15px;
            page-break-inside: avoid;
          }

          .section-title {
            font-weight: bold;
            margin-bottom: 5px;
            color: #000;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            margin: 10px 0;
          }

          td, th {
            padding: 5px;
            border: 1px solid #000;
          }

          .diagnosis-tag {
            display: inline-block;
            margin: 2px;
            padding: 2px 8px;
            border: 1px solid #000;
            border-radius: 12px;
          }

          .medication {
            margin-bottom: 5px;
          }

          .empty-field {
            display: none;
          }

          button, .no-print {
            display: none;
          }
        }
      `}
    </style>
  )
}

export default PrintStyles
