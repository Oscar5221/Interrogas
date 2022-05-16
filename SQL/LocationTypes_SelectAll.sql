USE [Interrogas]
GO
/****** Object:  StoredProcedure [dbo].[LocationTypes_SelectAll]    Script Date: 5/16/2022 4:16:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Oscar Hernandez
-- Create date: 4/2/2022
-- Description:	LocationTypes SelectAll
-- Code Reviewer: David Wiltrout


-- MODIFIED BY: Oscar Hernandez
-- MODIFIED DATE: 4/2/2022
-- Code Reviewer: 
-- Note: 
-- =============================================

ALTER PROC [dbo].[LocationTypes_SelectAll]

as

/*---------------Test Code---------------

EXECUTE dbo.LocationTypes_SelectAll

*/

BEGIN

	SELECT [Id]
		,[Name]

	FROM [dbo].[LocationTypes]

END