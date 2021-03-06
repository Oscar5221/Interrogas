USE [Interrogas]
GO
/****** Object:  StoredProcedure [dbo].[Locations_Update]    Script Date: 5/16/2022 4:13:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Oscar Hernandez
-- Create date: 4/2/2022
-- Description: Locations Update
-- Code Reviewer: David Wiltrout

-- MODIFIED BY: Oscar Hernandez
-- MODIFIED DATE:4/2/2022
-- Code Reviewer:
-- Note:
-- =============================================

ALTER PROC [dbo].[Locations_Update]
			   @LocationTypeId int
			  ,@LineOne nvarchar(255)
			  ,@LineTwo nvarchar(255)
			  ,@City nvarchar(255)
			  ,@Zip nvarchar(50)
			  ,@StateId int
			  ,@Latitude float
			  ,@Longitude float
			  ,@Id int

as

/*---------------Test code---------------

	Declare @Id int = 2 

	Declare	   @LocationTypeId int = 2
			  ,@LineOne nvarchar(255) = 'test33333'
			  ,@LineTwo nvarchar(255) = 'test2 updated'
			  ,@City nvarchar(255) = 'test2'
			  ,@Zip nvarchar(50) = 'test2'
			  ,@StateId tinyint = 2
			  ,@Latitude float = 20.25
			  ,@Longitude float = 20.25


	Execute dbo.Locations_Update

			   @LocationTypeId
			  ,@LineOne
			  ,@LineTwo
			  ,@City
			  ,@Zip
			  ,@StateId
			  ,@Latitude
			  ,@Longitude
			  ,@Id

	Select * from dbo.Locations

*/

BEGIN

	UPDATE [dbo].[Locations]
	   SET [LocationTypeId] = @LocationTypeId
		  ,[LineOne] = @LineOne
		  ,[LineTwo] = @LineTwo
		  ,[City] = @City
		  ,[Zip] = @Zip
		  ,[StateId] = @StateId
		  ,[Latitude] = @Latitude
		  ,[Longitude] = @Longitude
		  ,[DateModified] = getutcdate()

	WHERE @Id = Id

END