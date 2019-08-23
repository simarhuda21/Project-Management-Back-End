
const userForgotPassword = '<html xmlns="http://www.w3.org/1999/xhtml">' +
'' +
'<head>' +
'<meta name="viewport" content="width=device-width, initial-scale=1.0" />' +
'<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />' +
'<title>Set up a new password for Project Management</title>' +
'<style type="text/css" rel="stylesheet" media="all">' +
'*:not(br):not(tr):not(html) {' +
'font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;' +
'box-sizing: border-box;' +
'}' +
'body {' +
' width: 100% !important;' +
' height: 100%;' +
' margin: 0;' +
' line-height: 1.4;' +
' background-color: #F2F4F6;' +
' color: #222;' +
' -webkit-text-size-adjust: none;' +
'}' +
'p,' +
'ul,' +
'ol,' +
'blockquote {' +
'  line-height: 1.4;' +
'  text-align: left;' +
'}' +
'a {' +
'  color: #222;' +
'}' +

'a img {' +
'  border: none;' +
'}' +

'td {' +
'  word-break: break-word;' +
'}' +
'/* Layout ------------------------------ */' +

'.email-wrapper {' +
'  width: 100%;' +
'  margin: 0;' +
'  padding: 0;' +
'  -premailer-width: 100%;' +
'  -premailer-cellpadding: 0;' +
'  -premailer-cellspacing: 0;' +
'  background-color: #fff;' +
'}' +

'.email-content {' +
'  width: 100%;' +
'  margin: 0;' +
'  padding: 0;' +
'  -premailer-width: 100%;' +
'  -premailer-cellpadding: 0;' +
'  -premailer-cellspacing: 0;' +
'}' +
'/* Masthead ----------------------- */' +

'.email-masthead {' +
'  padding: 25px 0;' +
'  text-align: center;' +
'}' +

'.email-masthead_logo {' +
'  width: 94px;' +
'}' +

'.email-masthead_name {' +
'  font-size: 16px;' +
'  font-weight: bold;' +
'  color: #bbbfc3;' +
'  text-decoration: none;' +
'  text-shadow: 0 1px 0 white;' +
'}' +
'/* Body ------------------------------ */' +

'.email-body {' +
'  width: 100%;' +
'  margin: 0;' +
'  padding: 0;' +
'  -premailer-width: 100%;' +
'  -premailer-cellpadding: 0;' +
'  -premailer-cellspacing: 0;' +
'  border-top: 1px solid #EDEFF2;' +
'  border-bottom: 1px solid #EDEFF2;' +
'  background-color: #FFFFFF;' +
'}' +

'.email-body_inner {' +
'  width: 570px;' +
'  margin: 0 auto;' +
'  padding: 0;' +
'  -premailer-width: 570px;' +
'  -premailer-cellpadding: 0;' +
'  -premailer-cellspacing: 0;' +
'  background-color: #fff;' +
'}' +

'.email-footer {' +
'  width: 570px;' +
'  margin: 0 auto;' +
'  padding: 0;' +
'  -premailer-width: 570px;' +
'  -premailer-cellpadding: 0;' +
'  -premailer-cellspacing: 0;' +
'  text-align: center;' +
'}' +

'.email-footer p {' +
'  color: #AEAEAE;' +
'}' +

'.body-action {' +
'  width: 100%;' +
'  margin: 30px auto;' +
'  padding: 0;' +
'  -premailer-width: 100%;' +
'  -premailer-cellpadding: 0;' +
'  -premailer-cellspacing: 0;' +
'  text-align: center;' +
'}' +

'.body-sub {' +
'  margin-top: 25px;' +
'  padding-top: 25px;' +
'  border-top: 1px solid #EDEFF2;' +
'}' +

'.content-cell {' +
'  padding: 35px;' +
'}' +

'.preheader {' +
'  display: none !important;' +
'  visibility: hidden;' +
'  mso-hide: all;' +
'  font-size: 1px;' +
'  line-height: 1px;' +
'  max-height: 0;' +
'  max-width: 0;' +
'  opacity: 0;' +
'  overflow: hidden;' +
'}' +
'/* Attribute list ------------------------------ */' +

'.attributes {' +
'  margin: 0 0 21px;' +
'}' +

'.attributes_content {' +
'  background-color: #EDEFF2;' +
'  padding: 16px;' +
'}' +

'.attributes_item {' +
'  padding: 0;' +
'}' +
'/* Related Items ------------------------------ */' +

'.related {' +
'  width: 100%;' +
'  margin: 0;' +
'  padding: 25px 0 0 0;' +
'  -premailer-width: 100%;' +
'  -premailer-cellpadding: 0;' +
'  -premailer-cellspacing: 0;' +
'}' +

'.related_item {' +
'  padding: 10px 0;' +
'  color: #74787E;' +
'  font-size: 15px;' +
'  line-height: 18px;' +
'}' +

'.related_item-title {' +
'  display: block;' +
'  margin: .5em 0 0;' +
'}' +

'.related_item-thumb {' +
'  display: block;' +
'  padding-bottom: 10px;' +
'}' +

'.related_heading {' +
'  border-top: 1px solid #EDEFF2;' +
'  text-align: center;' +
'  padding: 25px 0 10px;' +
'}' +
'/* Discount Code ------------------------------ */' +

'.discount {' +
'  width: 100%;' +
'  margin: 0;' +
'  padding: 24px;' +
'  -premailer-width: 100%;' +
'  -premailer-cellpadding: 0;' +
'  -premailer-cellspacing: 0;' +
'  background-color: #EDEFF2;' +
'  border: 2px dashed #9BA2AB;' +
'}' +

'.discount_heading {' +
'  text-align: center;' +
'}' +

'.discount_body {' +
'  text-align: center;' +
'  font-size: 15px;' +
'}' +
'/* Social Icons ------------------------------ */' +

'.social {' +
'  width: auto;' +
'}' +

'.social td {' +
'  padding: 0;' +
'  width: auto;' +
'}' +

'.social_icon {' +
'  height: 20px;' +
'  margin: 0 8px 10px 8px;' +
'  padding: 0;' +
'}' +
'/* Data table ------------------------------ */' +

'.purchase {' +
'  width: 100%;' +
'  margin: 0;' +
'  padding: 35px 0;' +
'  -premailer-width: 100%;' +
'  -premailer-cellpadding: 0;' +
'  -premailer-cellspacing: 0;' +
'}' +

'.purchase_content {' +
'  width: 100%;' +
'  margin: 0;' +
'  padding: 25px 0 0 0;' +
'  -premailer-width: 100%;' +
'  -premailer-cellpadding: 0;' +
'  -premailer-cellspacing: 0;' +
'}' +

'.purchase_item {' +
'  padding: 10px 0;' +
'  color: #74787E;' +
'  font-size: 15px;' +
'  line-height: 18px;' +
'}' +

'.purchase_heading {' +
'  padding-bottom: 8px;' +
'  border-bottom: 1px solid #EDEFF2;' +
'}' +

'.purchase_heading p {' +
'  margin: 0;' +
'  color: #9BA2AB;' +
'  font-size: 12px;' +
'}' +

'.purchase_footer {' +
'  padding-top: 15px;' +
'  border-top: 1px solid #EDEFF2;' +
'}' +

'.purchase_total {' +
'  margin: 0;' +
'  text-align: right;' +
'  font-weight: bold;' +
'  color: #2F3133;' +
'}' +

'.purchase_total--label {' +
'  padding: 0 15px 0 0;' +
'}' +
'/* Utilities ------------------------------ */' +

'.align-right {' +
'  text-align: right;' +
'}' +

'.align-left {' +
'  text-align: left;' +
'}' +

'.align-center {' +
'  text-align: center;' +
'}' +
'/*Media Queries ------------------------------ */' +

'@media only screen and (max-width: 600px) {' +
'  .email-body_inner,' +
'  .email-footer {' +
'    width: 100% !important;' +
'  }' +
'}' +

'@media only screen and (max-width: 500px) {' +
'  .button {' +
'    width: 100% !important;' +
'  }' +
'}' +
'/* Buttons ------------------------------ */' +

'.button {' +
'  background-color: #fff;' +
'  border-top: 10px solid #222;' +
'  border-right: 18px solid #222;' +
'  border-bottom: 10px solid #222;' +
'  border-left: 18px solid #222;' +
'  display: inline-block;' +
'  color: #222;' +
'  text-decoration: none;' +
'  border-radius: 3px;' +
'  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.16);' +
'  -webkit-text-size-adjust: none;' +
'}' +

'.button--green {' +
'  background-color: #fff;' +
'  border-top: 10px solid #fff;' +
'  border-right: 18px solid #fff;' +
'  border-bottom: 10px solid #fff;' +
'  border-left: 18px solid #fff;' +
'}' +

'.button-blue {' +
'  background-color: #222;' +
'  border-top: 10px solid #222;' +
'  border-right: 18px solid #222;' +
'  border-bottom: 10px solid #222;' +
'  border-left: 18px solid #222;' +
'  color: #fff;' +
'  }' +

'.button--red {' +
'  background-color: #FF6136;' +
'  border-top: 10px solid #FF6136;' +
'  border-right: 18px solid #FF6136;' +
'  border-bottom: 10px solid #FF6136;' +
'  border-left: 18px solid #FF6136;' +
'}' +
'/* Type ------------------------------ */' +

'h1 {' +
'  margin-top: 0;' +
'  color: #222;' +
'  font-size: 19px;' +
'  font-weight: bold;' +
'  text-align: left;' +
'}' +

'h2 {' +
'  margin-top: 0;' +
'  color: #2F3133;' +
'  font-size: 16px;' +
'  font-weight: bold;' +
'  text-align: left;' +
'}' +

'h3 {' +
'  margin-top: 0;' +
'  color: #2F3133;' +
'  font-size: 14px;' +
'  font-weight: bold;' +
'  text-align: left;' +
'}' +

'p {' +
'  margin-top: 0;' +
'  color: #222;' +
'  font-size: 16px;' +
'  line-height: 1.5em;' +
'  text-align: left;' +
'}' +

'p.sub {' +
'  font-size: 12px;' +
'}' +

'p.center {' +
'  text-align: center;' +
'}' +
'</style>' +
'</head>' +
'<body>' +
'<span class="preheader">Use this link to reset your password. The link is only valid for 30 Minutes.</span>' +
'<table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0">' +
'   <tr>' +
'      <td class="masthead" align="center"  style=" padding: 17px 0;background: white;>' +
'      </td>' +
'       </tr>' +
'        <!-- Email Body -->' +
'        <tr>' +
'          <td class="email-body" width="100%" cellpadding="0" cellspacing="0">' +
'            <table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0">' +
'              <!-- Body content -->' +
'              <tr>' +
'                <td class="content-cell">' +
'                  <h1>Hi {STAFF_NAME},</h1>' +
'                  <p>You recently requested to reset your password for your Project Management account. Use the button below to reset it.</p>' +
'                  <table class="body-action" align="center" width="100%" cellpadding="0" cellspacing="0">' +
'                    <tr>' +
'                      <td align="center">' +
'                        <table width="100%" border="0" cellspacing="0" cellpadding="0">' +
'                          <tr>' +
'                            <td align="center">' +
'                              <table border="0" cellspacing="0" cellpadding="0">' +
'                                <tr>' +
'                                  <td>' +
'                                    <a href="{RESET_LINK}" class="button button-blue" target="_blank">Reset your password</a>' +
'                                  </td>' +
'                                </tr>' +
'                              </table>' +
'                            </td>' +
'                          </tr>' +
'                        </table>' +
'                      </td>' +
'                    </tr>' +
'                  </table>' +
'                  <p>If you did not request a password reset, please ignore this email or <a href="{support_url}">contact support</a> if you have questions.</p>' +
'                  <p>Thanks,' +
'                    <br>The Project Management Team</p>' +
'                  <!-- Sub copy -->' +
'                  <table class="body-sub">' +
'                    <tr>' +
'                      <td>' +
'                        <p class="sub">If you’re having trouble with the button above, copy and paste the URL below into your web browser.</p>' +
'                        <p class="sub"> {RESET_LINK} </p>' +
'                      </td>' +
'                    </tr>' +
'                  </table>' +
'                </td>' +
'              </tr>' +
'            </table>' +
'          </td>' +
'        </tr>' +
'        <tr>' +
'          <td>' +
'            <table class="email-footer" align="center" width="570" cellpadding="0" cellspacing="0">' +
'              <tr>' +
'                <td class="content-cell" align="center">' +
'                  <p class="sub align-center">&copy; 2018 Project Management. All rights reserved.</p>' +
'                </td>' +
'              </tr>' +
'            </table>' +
'          </td>' +
'        </tr>' +
'      </table>' +
'    </td>' +
'  </tr>' +
'</table>' +
'</body>' +
'</html>';

module.exports = userForgotPassword;
