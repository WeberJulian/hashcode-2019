#include <iostream>
#include <fstream>
#include <array>
#include <vector>
#include <sstream>
#include <time.h>
#include <sys/time.h>
using namespace std;

const int dataset = 1;
const string filenames[4] = {"a_example.in", "b_small.in", "c_medium.in", "d_big.in"};
const string filename = filenames[dataset];

ifstream input("datasets/"+filename);

struct Slice
{
   int r1;
   int c1;
   int r2;
   int c2;
};

void printPizza(char **pizza, int R, int C);
void freePizza(char **pizza, int R);
void exportSolution(vector<Slice> slices);
int randomInt(int min, int max); // max included
Slice getRandomSlice(int R, int C);
bool goodSize(Slice slice, int R, int C, int L, int H);
int countPoints(vector<Slice> slices);
long now();

int main()
{
   srand (time(NULL));
   int R, C, L, H;
   string line;
   getline(input, line);
   string delimiter = " ";
   std::string::size_type sz;

   R = stoi(line.substr(0, line.find(delimiter)),&sz);
   line = line.substr(line.find(delimiter) + 1, line.length() - 1);
   C = stoi(line.substr(0, line.find(delimiter)),&sz);
   line = line.substr(line.find(delimiter) + 1, line.length() - 1);
   L = stoi(line.substr(0, line.find(delimiter)),&sz);
   line = line.substr(line.find(delimiter) + 1, line.length() - 1);
   H = stoi(line.substr(0, line.find(delimiter)),&sz);
   line = line.substr(line.find(delimiter) + 1, line.length() - 1);

   char **pizza = new char *[R];
   vector<Slice> slices;
   slices.push_back(getRandomSlice(R, C));
   slices.push_back(getRandomSlice(R, C));
   cout << goodSize(slices[0], R, C, L, H) << endl;
   for (int i = 0; i < R; i++)
      pizza[i] = new char[C];

   int j = 0;
   for (string line; getline(input, line);)
   {
      for (int i = 0; i < C; i++)
      {
         pizza[j][i] = line[i];
      }
      j++;
   }
   //printPizza(pizza, R, C);
   freePizza(pizza, R);
   exportSolution(slices);
   return 0;
}

void printPizza(char **pizza, int R, int C)
{
   for (int i = 0; i < R; i++)
   {
      for (int j = 0; j < C; j++)
      {
         cout << pizza[i][j];
      }
      cout << endl;
   }
}

void freePizza(char **pizza, int R)
{
   for (int i = 0; i < R; i++)
   {
      free(pizza[i]);
   }
   free(pizza);
}

void exportSolution(vector<Slice> slices){
   ofstream myfile ("solutions/solution_"+filename);
   myfile << to_string(slices.size()) +" \n";
   for (int i = 0; i < slices.size(); i++){
      myfile << to_string(slices[i].r1) + " " + to_string(slices[i].c1) + " " + to_string(slices[i].r2) + " " + to_string(slices[i].c2) + " \n";
   }
   myfile.close();
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

bool goodSize(Slice slice, int R, int C, int L, int H){
   if(!(
         slice.r1 >= 0 && 
         slice.c1 >= 0 &&
         slice.r2 >= 0 && 
         slice.c2 >= 0 &&
         slice.r1 < R &&
         slice.c1 < C &&
         slice.r2 < R &&
         slice.c2 < C &&
         (slice.r2-slice.r1+1) * (slice.c2-slice.c1+1) >= 2*L &&
         (slice.r2-slice.r1+1) * (slice.c2-slice.c1+1) <= H
   )){
      return false;
   }
   else{
      return true;
   }
}

int countPoints(vector<Slice> slices){
   int points = 0;
   Slice slice;
   for(int i = 0; i < slices.size(); i++){
      slice = slices[i];
      points += (slice.r2 - slice.r1 + 1) * (slice.c2 - slice.c1 + 1);
   }
   return points;
}

long now(){
   struct timeval tp;
   gettimeofday(&tp, NULL);
   long int ms = tp.tv_sec * 1000 + tp.tv_usec / 1000;
   return ms;
}