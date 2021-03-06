USE [Interrogas]
GO
/****** Object:  StoredProcedure [dbo].[Locations_Insert]    Script Date: 5/16/2022 4:11:13 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Oscar Hernandez
-- Create date: 4/2/2022
-- Description:	Locations Insert Proc
-- Code Reviewer: David Wiltrout


-- MODIFIED BY: Oscar Hernandez
-- MODIFIED DATE: 4/2/2022
-- Code Reviewer: 
-- Note: 
-- =============================================

ALTER PROC [dbo].[Locations_Insert]
			@Id int OUTPUT
		   ,@LocationTypeId int
           ,@LineOne nvarchar(255)
           ,@LineTwo nvarchar(255)
           ,@City nvarchar(255)
           ,@Zip nvarchar(50)
           ,@StateId int
           ,@Latitude float
           ,@Longitude float

as

/*------------------Test code-------------------

		Declare @Id int = 0
			   ,@LocationTypeId int = 4
			   ,@LineOne nvarchar(255) = 'test6'
			   ,@LineTwo nvarchar(255) = 'test6'
			   ,@City nvarchar(255) = 'test6'
			   ,@Zip nvarchar(50) = 'test6'
			   ,@StateId tinyint = 6
			   ,@Latitude float = 60.10
			   ,@Longitude float = 60.10


		Execute dbo.Locations_Insert

				@Id OUTPUT
			   ,@LocationTypeId
			   ,@LineOne
			   ,@LineTwo
			   ,@City
			   ,@Zip
			   ,@StateId
			   ,@Latitude
			   ,@Longitude


		Execute dbo.Locations_SelectById
										@Id

*/

BEGIN

INSERT INTO [dbo].[Locations]
           ([LocationTypeId]
           ,[LineOne]
           ,[LineTwo]
           ,[City]
           ,[Zip]
           ,[StateId]
           ,[Latitude]
           ,[Longitude])
     VALUES
           (@LocationTypeId
           ,@LineOne
           ,@LineTwo
           ,@City
           ,@Zip
           ,@StateId
           ,@Latitude
           ,@Longitude)
	SET @Id = SCOPE_IDENTITY()

END