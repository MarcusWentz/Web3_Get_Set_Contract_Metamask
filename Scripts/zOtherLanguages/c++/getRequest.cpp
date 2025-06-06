#include <stdio.h>
#include <curl/curl.h>

// Step 1: Compile the program with flag "lcurl" to link the library
// g++ getRequest.cpp -lcurl -o getRequest
// Step 2: Run the program
// ./getRequest
// Build and run in the same command:
// g++ getRequest.cpp -lcurl -o getRequest && ./getRequest

int main(void)
{
  CURL *curl;
  CURLcode res;

  curl = curl_easy_init();
  if(curl) {
    /* First set the URL that is about to receive our POST. This URL can
       just as well be a https:// URL if that is what should receive the
       data. */
    curl_easy_setopt(curl, CURLOPT_URL, "http://api.open-notify.org/astros.json");

    /* Perform the request, res will get the return code */
    res = curl_easy_perform(curl);

    /* always cleanup */
    curl_easy_cleanup(curl);
  }
  return 0;
}