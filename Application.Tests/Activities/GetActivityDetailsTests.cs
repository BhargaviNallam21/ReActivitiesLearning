using Application.Activities.Queries;
using Domain;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Tests.Activities;

public class GetActivityDetailsTests
{
    [Fact]
    public async Task Handle_ShouldReturnSuccess_WhenActivityExists()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        var activity = new Activity
        {
            Id = Guid.NewGuid().ToString(),
            Title = "Test Activity",
            Date = DateTime.UtcNow,
            Description = "Test description",
            Category = "Test",
            City = "Test City",
            Venue = "Test Venue",
            Latitude = 10,
            Longitude = 20,
            IsCancelled = false
        };

        await using (var seedContext = new AppDbContext(options))
        {
            seedContext.Activities.Add(activity);
            await seedContext.SaveChangesAsync();
        }

        await using var context = new AppDbContext(options);
        var handler = new GetActivityDetails.Handler(context);

        // Act
        var result = await handler.Handle(
            new GetActivityDetails.Query { Id = activity.Id },
            CancellationToken.None);

        // Assert
        result.IsSuccess.Should().BeTrue();
        result.Value.Should().NotBeNull();
        result.Value!.Id.Should().Be(activity.Id);
        result.Value.Title.Should().Be(activity.Title);
    }

    [Fact]
    public async Task Handle_ShouldReturnFailure_WhenActivityDoesNotExist()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        await using var seedContext = new AppDbContext(options);
        var handler = new GetActivityDetails.Handler(seedContext);

        // Act
        var result = await handler.Handle(
            new GetActivityDetails.Query { Id = Guid.NewGuid().ToString() },
            CancellationToken.None);

        // Assert
        result.IsSuccess.Should().BeFalse();
        result.Value.Should().BeNull();
        result.Error.Should().Be("Activity not found");
        result.Code.Should().Be(404);
    }
}
