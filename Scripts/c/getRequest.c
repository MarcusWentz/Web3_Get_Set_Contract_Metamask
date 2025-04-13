
#include <stdio.h>
#include <stdlib.h>
#include <curl/curl.h>

// Step 1: Compile the program with flag "lcurl" to link the library
// gcc getRequest.c -lcurl -o getRequest
// Step 2: Run the program
// ./getRequest
// Build and run in the same command:
// gcc getRequest.c -lcurl -o getRequest && ./getRequest

int main(void) {
    CURL *curl = curl_easy_init();

    if(!curl) {
        printf("curl init failed");
        return 1;
    }

    curl_easy_setopt(curl, CURLOPT_URL, "http://api.open-notify.org/astros.json");

    CURLcode result = curl_easy_perform(curl);

    if(result != CURLE_OK) {
        printf("curl error");
    }

    curl_easy_cleanup(curl); 

    return 0;
}