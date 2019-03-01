#include <iostream>
#include <fstream>
#include <array>
#include <vector>
#include <list>
#include <sstream>
#include <time.h>
#include <sys/time.h>
#include <ctime>

using namespace std;

struct Slice
{
   int r1;
   int c1;
   int r2;
   int c2;
};

struct Node { 
   Slice data; 
   struct Node *next; 
}; 
struct Node* head = NULL;   

void insert(Slice new_data) { 
   struct Node* new_node = (struct Node*) malloc(sizeof(struct Node));
   new_node->data = new_data; 
   new_node->next = head; 
   head = new_node; 
} 

int randomInt(int min, int max){
   return min + rand() % (max + 1) ;
}

Slice getRandomSlice(int R, int C) {
   Slice slice;
   int r = randomInt(0, R);
   int c = randomInt(0, C);
   slice.r1 = r;
   slice.c1 = c;
   slice.r2 = r + randomInt(0, R - r);
   slice.c2 = c + randomInt(0, C - c);
   return slice;
}


int main(){
    srand (time(NULL));
    time_t t0;
    time(&t0);
    vector<Slice> slices;
    long long counter = 0;
    while(difftime(time(NULL), t0) < 1){
        counter++;
        //insert(getRandomSlice(10, 10));
        slices.push_back(getRandomSlice(10, 10));
    }
    cout << counter/100000 << endl;
    return 0;
}