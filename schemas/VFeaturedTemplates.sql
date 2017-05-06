SELECT
   TT.strTemplateID
  ,TT.strTitle            AS strTemplateTitle
  ,TT.strAlias            AS strTemplateAlias
  ,TT.strDescription      AS strTemplateDescription
  ,TT.strKeywords         AS strTemplateKeywords
  ,TT.dteDate             AS strTemplateUploadDate
  ,TT.strDownload         AS strTemplateDownload
  ,TT.intDownloadCount    AS intTemplateDownloadCount
  ,TT.intSortOrder        AS intTemplateSortOrder
  ,TT.intViewCount        AS intTemplateViewCount
  ,TT.strDownloadContents AS strTemplateDownloadContents
  ,TT.dteLastUpdated      AS dteTemplateLastUpdatedDate
  ,TT.dteReleaseDate      AS dteTemplateReleaseDate
  ,TT.intStatusID         AS intTemplateStatusID

  ,TC.intCategoryID
  ,TC.strCategory

  ,TF.strFontID
  ,TF.strFont
  ,TF.strFontDownload

  ,TTF.intSortOrder       AS intFontSortOrder

  ,TI.strImageID
  ,TI.strTitle            AS strImageTitle
  ,TI.strOwner            AS strImageOwner
  ,TI.strAlias            AS strImageAlias
  ,TI.dteDate             AS dteImageUploadDate
  ,TI.blnIsFeatured       AS blnIsFeaturedImage
  ,TI.intStatusID         AS intImageStatusID

  ,TTI.intSortOrder       AS intImageSortOrder

  ,TU.strUserID
  ,TU.strUsername
  ,TU.strEmail
  ,TU.strAvatar
  ,TU.strBio
  ,TU.intStatusID         AS intUserStatusID
FROM
   TTemplates       AS TT
  ,TTemplateFonts   AS TTF
  ,TFonts           AS TF
  ,TTemplateImages  AS TTI
  ,TImages          AS TI
  ,TCategories      AS TC
  ,TStatus          AS TS
  ,TUsers           AS TU
WHERE
      TT.strTemplateID    = TTF.strTemplateID
  AND TTF.strFontID       = TF.strFontID
  AND TT.strTemplateID    = TTI.strTemplateID
  AND TTI.strImageID      = TI.strImageID
  AND TT.intCategoryID    = TC.intCategoryID

  AND TI.intStatusID      = TS.intStatusID
  AND TI.strUserID        = TU.strUserID
  AND TT.strUserID        = TU.strUserID
  AND TT.intStatusID      = TS.intStatusID

  AND TTI.intSortOrder   = 1
  AND TI.intStatusID     = 1
  AND TT.intStatusID     = 1
  AND TU.intStatusID     = 1
  AND DATEDIFF(NOW(), TT.dteReleaseDate) < 365
ORDER BY
   TT.intViewCount DESC
  ,TT.intSortOrder DESC
