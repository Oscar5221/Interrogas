USE [Interrogas]
GO
/****** Object:  StoredProcedure [dbo].[Locations_SelectByIdV2]    Script Date: 5/16/2022 4:13:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Oscar Hernandez
-- Create date: 4/6/2022
-- Description: Locations SelectById
-- Code Reviewer: Tim Isabella

-- MODIFIED BY: Oscar Hernandez
-- MODIFIED DATE:4/6/2022
-- Code Reviewer:
-- Note:
-- =============================================

ALTER PROC [dbo].[Locations_SelectByIdV2]
				@Id int
as

/*---------------Test Code---------------

Declare @Id int = 2

Execute dbo.Locations_SelectByIdV2 @Id

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
  WHERE l.Id = @Id

END


