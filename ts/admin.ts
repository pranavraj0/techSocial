import { values } from "lodash";

$(document).ready(function () {
    $("#submit").click(function () {
       $.post("adminview",
          {
             add1: $("a[name=\"add1\"]").attr("value"),
             add5: $("a[name=\"add5\"]").attr("value"),
             custom: $("a[name=\"custom\"]").attr("value"),
             submit:$("a[name=\"submit\"]").attr("value"),
             resetprices:$("a[name=\"resetprices\"]").attr("value"),
             resetall:$("a[name=\"resetall\"]").attr("value")
          },
          function (data, status) {
             console.log(data);
          });
    });
 });

