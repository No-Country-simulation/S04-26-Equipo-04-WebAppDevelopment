FROM mcr.microsoft.com/dotnet/sdk:8.0
WORKDIR /src
COPY . .
RUN dotnet restore
EXPOSE 8080
ENV ASPNETCORE_ENVIRONMENT=Development
ENV DOTNET_USE_POLLING_FILE_WATCHER=true
CMD ["dotnet", "watch", "run", "--urls", "http://0.0.0.0:8080"]
