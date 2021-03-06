USE [Interrogas]
GO
/****** Object:  StoredProcedure [dbo].[Locations_SelectAll]    Script Date: 5/16/2022 4:12:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROC [dbo].[Locations_SelectAll]

as

/*
Execute dbo.Locations_SelectAll
*/

BEGIN 

SELECT l.[Id]
      ,l.[LocationTypeId]
	  ,lt.[Name]
      ,l.[LineOne]
      ,l.[LineTwo]
      ,l.[City]
      ,l.[Zip]
      ,l.[StateId]
	  ,s.[Name]
	  ,s.[Code]
      ,l.[Latitude]
      ,l.[Longitude]

  FROM [dbo].[Locations] as l INNER JOIN [dbo].[LocationTypes] as lt
								ON l.LocationTypeId = lt.Id

							  INNER JOIN [dbo].[States] as s
							    ON l.StateId = s.Id
 

END