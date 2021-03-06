# User Authentication Check
Project checks it a user has already claimed their free credit

## Links
Front-end: https://userauth-frontend.herokuapp.com/ <br>
github: https://github.com/malcolmhess3/textranch-frontend

back-end: https://userauth-backend.herokuapp.com/ <br>
github: https://github.com/malcolmhess3/textranch-backend

## Approach

My approach to the problem was to create a user agnostic solution. The idea was to create minimal disruption to the already existing database while making a simple solution that works. 

## How it works
The front end gets the user's browser fingerprint and IP address and then sends that information to the backend. The backend then checks if that combination of fingerprint and IP has been used already and returns the following </br>
If Ip and fingerprint are the same as one already stored = already credited </br>
If Ip is the same and fingerprint is not = probably already credited </br>
If Ip is different and fingerprint is the same = probably already credited </br>
If Ip and fingerprint are different = uncredited </br>
Once an uncredited account receives it's credit, the data base adds the ip and fingerprint to a table in the database to prevent another account from receiving a credit from the same Ip and fingerprint.

## Advantages
The given solution does minimal disruption to the database. The fingerprint module is unlikely to give 2 different browsers the same token meaning that it is very unlikely that a legitimate user will login and be unable to claim their credit. 

## Disadvantages
The given solution only checks for fingerprint and IP, a malicious use could still use a vpn and a different browser to get around the check. Currently the solution does not check for which user is trying to login with the same fingerprint and IP, this prevents further investigation.
