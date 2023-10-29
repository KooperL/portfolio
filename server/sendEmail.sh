#!/bin/sh

recipient="$EMAIL"

if [ -z "$recipient" ]; then
    echo "ERROR: The EMAIL environment variable is not set."
    exit 1
fi

if [ -n "$1" ]; then
    body="$1"
else
    # Read the email body from standard input
    body=$(cat)
fi

if [ -z "$body" ]; then
    echo "ERROR: No email body provided."
    exit 1
fi

(
echo "To: $recipient"
echo "Subject: not a spam email"
echo "Content-Type: text/html"
echo
echo "$body"
echo
) | /usr/sbin/sendmail -t

