# Alma Server

### Generate SSL Certificates

1. Install minica by running `brew install minica`
2. Navigate to `alma/packages/alma-server/ssl` and run `minica --domains '*.alma.sh'`
3. Add the `minica.pem` certificate to your Keychain
4. Find the imported certificate in your Keychain and right-click and select `Get Info` and select `Always Trust` when using the certificate
