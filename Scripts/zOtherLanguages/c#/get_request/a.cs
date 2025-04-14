// Install package dotnet to run C# programs: 
// https://formulae.brew.sh/formula/dotnet
// Run program with: 
// dotnet run
// Note: if you get an error running the program about project files missing run: 
// dotnet new console --force

using System;
using System.Net.Http;
using System.Threading.Tasks;

class Program
{
    static async Task Main()
    {
        var url = "http://api.open-notify.org/astros.json";

        using var client = new HttpClient();
        var response = await client.GetStringAsync(url);

        Console.WriteLine(response);
    }
}