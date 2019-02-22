#include <iostream>
#include <fstream>
#include <array>
#include <vector>
#include <sstream>
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

int main()
{
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
   Slice hello;
   hello.r1 = 1;
   hello.c1 = 1;
   hello.r2 = 2;
   hello.c2 = 2;
   slices.push_back(hello);
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