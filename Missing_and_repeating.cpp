/*
Given an unsorted array arr of of positive integers. One number 'A' from set {1, 2,....,n} is 
missing and one number 'B' occurs twice in array.
Find numbers A and B.

Expected Time Complexity: O(n)
Expected Auxiliary Space: O(1)
*/


#include <bits/stdc++.h>
using namespace std;

class Solution {
  public:
    vector<int> findTwoElement(vector<int>& arr) {
        int  i = 0;
        int repeated = -1;
        int missing = -1;
        
        vector<int> ans(2);
        for(int i = 0; i < arr.size(); i++){
            repeated = abs(arr[i]);
            missing = arr[repeated-1];
            if(missing > 0){
                arr[repeated-1] = -missing;
            }
            else ans[0] = repeated;
        }
        
        for(int i = 0; i < arr.size(); i++){
            if(arr[i] > 0){
                ans[1] = i+1;
                break;
            }
        }
        
        return ans;
    }
};


int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        vector<int> a(n);
        for (int i = 0; i < n; i++) {
            cin >> a[i];
        }
        Solution ob;
        auto ans = ob.findTwoElement(a);
        cout << ans[0] << " " << ans[1] << "\n";
    }
    return 0;
}
